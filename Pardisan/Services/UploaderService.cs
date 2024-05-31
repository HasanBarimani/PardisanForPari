
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Pardisan.Interface;
using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pardisan.Services
{
    public class UploaderService : IUploaderService
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public UploaderService(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<string> SimpleUpload(IFormFile file, string key)
        {


            var fileName = DateTime.Now.Ticks.ToString();
            fileName += Path.GetFileName(file.FileName);
            var path = _hostingEnvironment.WebRootPath + key + fileName;
            await file.CopyToAsync(new FileStream(path, FileMode.Create));
            return key + fileName;
        }
        public static void Compressimage(string targetPath, string filename, byte[] byteArrayIn)
        {
            try
            {
                System.Drawing.ImageConverter converter = new System.Drawing.ImageConverter();
                using (MemoryStream memstr = new MemoryStream(byteArrayIn))
                {
                    using (var image = Image.FromStream(memstr))
                    {
                        float maxHeight = 900.0f;
                        float maxWidth = 900.0f;
                        int newWidth;
                        int newHeight;
                        string extension;
                        Bitmap originalBMP = new Bitmap(memstr);
                        int originalWidth = originalBMP.Width;
                        int originalHeight = originalBMP.Height;

                        if (originalWidth > maxWidth || originalHeight > maxHeight)
                        {

                            // To preserve the aspect ratio  
                            float ratioX = (float)maxWidth / (float)originalWidth;
                            float ratioY = (float)maxHeight / (float)originalHeight;
                            float ratio = Math.Min(ratioX, ratioY);
                            newWidth = (int)(originalWidth * ratio);
                            newHeight = (int)(originalHeight * ratio);
                        }
                        else
                        {
                            newWidth = (int)originalWidth;
                            newHeight = (int)originalHeight;

                        }
                        Bitmap bitMAP1 = new Bitmap(originalBMP, newWidth, newHeight);
                        Graphics imgGraph = Graphics.FromImage(bitMAP1);
                        extension = Path.GetExtension(targetPath);
                        if (extension.ToLower() == ".png" || extension.ToLower() == ".gif" || extension.ToLower() == ".jpeg")
                        {
                            imgGraph.SmoothingMode = SmoothingMode.AntiAlias;
                            imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);
                            bitMAP1.Save(targetPath, image.RawFormat);
                            bitMAP1.Dispose();
                            imgGraph.Dispose();
                            originalBMP.Dispose();
                        }
                        else if (extension.ToLower() == ".jpg")
                        {
                            imgGraph.SmoothingMode = SmoothingMode.AntiAlias;
                            imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);
                            ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
                            System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Quality;
                            EncoderParameters myEncoderParameters = new EncoderParameters(1);
                            EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 50L);
                            myEncoderParameters.Param[0] = myEncoderParameter;
                            bitMAP1.Save(targetPath, jpgEncoder, myEncoderParameters);

                            bitMAP1.Dispose();
                            imgGraph.Dispose();
                            originalBMP.Dispose();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string exc = ex.Message;
                throw;

            }
        }

        public static ImageCodecInfo GetEncoder(ImageFormat format)
        {

            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();

            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }
    }
}
