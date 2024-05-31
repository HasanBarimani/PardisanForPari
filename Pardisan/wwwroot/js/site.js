

let theEditor;
function FullCkEditor(id) {
    DecoupledEditor
        .create(document.querySelector('#' + id))
        .then(editor => {
            theEditor = editor;
            const toolbarContainer = document.querySelector('#toolbar-container');
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        })
        .catch(error => {
            console.error(error);
        });
}

const dataStory = [
    {
        id: 0,
        title: 'پیش خرید/خرید',
        image: '../Img/Story/1.png',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت م'
    },
    {
        id: 1,
        title: 'مشارکت یا فروش',
        image: '../Img/Story/3.png',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت م'
    },
    {
        id: 2,
        title: 'معاوضه ملکی',
        image: '../Img/Story/4.png',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت م'
    },
    {
        id: 3,
        title: 'معاوضه غیر ملکی',
        image: '../Img/Story/2.png',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت م'
    },
    {
        id: 4,
        title: 'همکاری',
        image: '../Img/Story/5.png',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت م'
    },


]
const data = [
    {
        src: `<div class="white-popup rounded" ><div class="mfp-close"></div><div class="row">
        <div class="col-md-6 my-2">
        <div class="my-3 title-story-p">
       پیش خرید/خرید
        </div>
        <div class="my-3">
        <span class="text-justify">
        عرض ادب واحترام</br> دوست گرامی شما با انتخاب گزینه ارسال درخواست مشخصات فردی و ملک مورد نظر خود را انتخاب و ثبت نموده و در اولین فرصت کارشناسان فروش با شما ارتباط برقرار می کنند</br>پاینده باشید
        </span>
        </div>
        <div class="my-3">

        <a href="https://app.pardisan-mc.com/prebuy" class="btn btn-pardisan text-white">ارسال درخواست</a>
        </div>
        
        </div>
        <div class="col-md-6 my-2">
        <img class="img-modal img-fluid " src="../Img/Story/1.png">
        </div>
        </div></div>`,
        type: 'inline'
    },
    {
        src: `<div class="white-popup rounded"  ><div class="mfp-close"></div><div class="row">
        <div class="col-md-6 my-2">
        <div class="my-3 title-story-p">
        مشارکت یا فروش
        </div>
        <div class="my-3">
        <span class="text-justify">
عرض ادب و احترام </br> دوست گرامی شما با انتخاب گزینه ارسال درخواست مشخصات فردی و ملک خود را ثبت نموده و کارشناسان فروش در اولین فرصت با شما ارتباط برقرار می کنند.</br> پاینده باشید
        </span>
        </div>
        <div class="my-3">
        <a href="https://app.pardisan-mc.com/participate" class="btn btn-pardisan text-white">ارسال درخواست</a>
        </div>
        
        </div>
        <div class="col-md-6 my-2">
        <img class="img-modal img-fluid " src="../Img/Story/3.png">
        </div>
        </div></div>`,
        type: 'inline'
    },
    {
        src: `<div class="white-popup rounded"  ><div class="mfp-close"></div><div class="row">
        <div class="col-md-6 my-2">
        <div class="my-3 title-story-p">
        معاوضه ملکی
        </div>
        <div class="my-3">
        <span class="text-justify">عرض ادب و احترام</br>دوست گرامی شما با انتخاب گزینه ارسال درخواست مشخصات فردی و ملکی خودتان را ثبت نموده و سپس با انتخاب یکی از املاک انبوه سازان پردیسان منتظر ارتباط کارشناسان فروش در اولین فرصت باشید. </br> پاینده باشید
        </span>
        </div>
        <div class="my-3">
        <a href="https://app.pardisan-mc.com/exchange" class="btn btn-pardisan text-white">ارسال درخواست</a>
        </div>
        
        </div>
        <div class="col-md-6 my-2">
        <img class="img-modal img-fluid " src="../Img/Story/4.png">
        </div>
        </div></div>`,
        type: 'inline'
    }, {
        src: `<div class="white-popup rounded"  ><div class="mfp-close"></div><div class="row">
        <div class="col-md-6 my-2">
        <div class="my-3 title-story-p">
         معاوضه غیر ملکی
        </div>
        <div class="my-3">
        <span class="text-justify">عرض ادب و احترام</br>دوست گرامی شما با انتخاب گزینه ارسال درخواست مشخصات فردی و درخواست مورد معاوضه خود را ثبت نموده تا در اولین فرصت کارشناسان فروش با شما ارتباط برقرار نمایند.</br> پاینده باشید
        </span>
        </div>
        <div class="my-3">
        <a href="https://app.pardisan-mc.com/offset" class="btn btn-pardisan text-white">ارسال درخواست</a>
        </div>
        
        </div>
        <div class="col-md-6 my-2">
        <img class="img-modal img-fluid " src="../Img/Story/2.png">
        </div>
        </div></div>`,
        type: 'inline'
    }, {
        src: `<div class="white-popup rounded"  ><div class="mfp-close"></div><div class="row">
        <div class="col-md-6 my-2">
        <div class="my-3 title-story-p">
         همکاری
        </div>
        <div class="my-3">
        <span class="text-justify">عرض ادب و احترام</br> دوست گرامی شما با انتخاب ارسال درخواست مشخصات فردی و نوع همکاری خود را ثبت نموده تا کارشناسان ما در اولین فرصت با شما ارتباط برقرار نمایند.</br> پاینده باشید
        </span>
        </div>
        <div class="my-3">
        <a href="https://app.pardisan-mc.com/cooperation" class="btn btn-pardisan text-white">ارسال درخواست</a>
        </div>
        
        </div>
        <div class="col-md-6 my-2">
        <img class="img-modal img-fluid " src="../Img/Story/5.png">
        </div>
        </div></div>`,
        type: 'inline'
    },

]
dataStory.map(item => {
    $("#pardisan-story").append(
        `<div class="item-story " id='item-story' data-id='${item.id}'>
     <div clsss='circle-story-content'>
    <img class="circle-story img-fluid" src="${item.image}">
    </div>
    <div>
    <span class='text-circle-story'>${item.title}</span>
    </div>
 </div>

        `
    )
})
$(document).ready(function () {
    $("#pardisan-story").on("click", "#item-story", function () {
        var id = $(this).data("id");

        $.magnificPopup.open({
            key: 'my-popup',
            items: data,
            type: 'inline',

            gallery: {
                enabled: true
            },

        }, id);
    });
    $('.upsert-request-btn').on('click', () => {
        $('.drawer-request').css({
            "left": "0"
        })
    })
    $('.close-drawer-request').on('click', () => {
        $('.drawer-request').css({
            "left": "-100%"
        })
    })
})

