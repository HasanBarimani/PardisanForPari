///building

var buildTitle = document.getElementById("build-title");
var btnMergStyle = document.getElementById("merg-unit");
var btnCloseSuggest = document.getElementById("close-suggest-unit");
var emptyUnit = document.getElementById("empty-unit");
var removeUnit = document.getElementById('remove-unit');
var unitForm = document.getElementById("unit-form");
var inputUnitName = document.getElementById("unit-inout-name");
var inputUnitMeterage = document.getElementById("unit-inout-meterage");
var floorInputName = document.getElementById("floor-inout-name");

const selections = [];
var setUnitId = null;
var isMerg = false;
var isUnitStyle = false;

const getMergedUnitDirection = (unit) => {
    const currentFloorNumber = unit?.floorNumber;
    const currentUnitIndex = selections[currentFloorNumber - 1]?.units?.findIndex(
        (u) => u.id === unit.id
    );

    if (
        currentUnitIndex > 0 &&
        selections[currentFloorNumber - 1]?.units[currentUnitIndex - 1]
            ?.mergedUnitId === unit.id
    ) {
        return "left";
    }

    if (
        currentUnitIndex < selections[currentFloorNumber - 1]?.units?.length - 1 &&
        selections[currentFloorNumber - 1]?.units[currentUnitIndex + 1]
            ?.mergedUnitId === unit.id
    ) {
        return "right";
    }

    const topFloor = selections[currentFloorNumber - 2];
    const bottomFloor = selections[currentFloorNumber];

    if (
        topFloor &&
        topFloor.units.length ===
        selections[currentFloorNumber - 1]?.units.length &&
        topFloor.units[currentUnitIndex]?.mergedUnitId === unit.id
    ) {
        return "top";
    }

    if (
        bottomFloor &&
        bottomFloor.units.length ===
        selections[currentFloorNumber - 1]?.units.length &&
        bottomFloor.units[currentUnitIndex]?.mergedUnitId === unit.id
    ) {
        return "bottom";
    }

    return "none";
};
function getUnitBorderStyle(unit) {
    const mergedUnitId = unit.mergedUnitId;
    const mergedUnit = selections
        .flatMap((floor) => floor.units)
        .find((u) => u.id === mergedUnitId);
    let style = "";

    if (mergedUnit) {
        const mergedUnitDirection = getMergedUnitDirection(mergedUnit);

        if (mergedUnitDirection === "bottom") {
            style += "border-right: 1px solid #000;";
            style += "border-left: 1px solid #000;";
            style += "border-top: 1px solid #000;";
            style += "border-bottom: 0px solid #fff;";
            style += "border-top-left-radius: 0.5rem;";
            style += "border-top-right-radius: 0.5rem;";
            style += "border-bottom-left-radius: 0;";
            style += "border-bottom-right-radius: 0;";
            style += "background-color: #eee;";
            style += "margin: 5px 5px 0px 5px;";
        } else if (mergedUnitDirection === "top") {
            style += "border-right: 1px solid #000;";
            style += "border-left: 1px solid #000;";
            style += "border-top: 0px solid #fff;";
            style += "border-bottom: 1px solid #000;";
            style += "border-bottom-left-radius: 0.5rem;";
            style += "border-bottom-right-radius: 0.5rem;";
            style += "border-top-left-radius: 0;";
            style += "border-top-right-radius: 0;";
            style += "background-color: #eee;";
            style += "margin: 0px 5px 5px 5px;";
        } else if (mergedUnitDirection === "right") {
            style += "border-top: 1px solid #000;";
            style += "border-right: 1px solid #000;";
            style += "border-bottom: 1px solid #000;";
            style += "border-left: 0px solid #fff;";
            style += "border-top-left-radius: 0rem;";
            style += "border-bottom-left-radius: 0rem;";
            style += "background-color: #eee;";
            style += "margin: 5px 5px 5px 0px;";
        } else if (mergedUnitDirection === "left") {
            style += "border-right: 0px solid #fff;";
            style += "border-left: 1px solid #000;";
            style += "border-top: 1px solid #000;";
            style += "border-bottom: 1px solid #000;";
            style += "border-top-right-radius: 0;";
            style += "border-bottom-right-radius: 0;";
            style += "border-top-left-radius: 0.5rem;";
            style += "border-bottom-left-radius: 0.5rem;";
            style += "background-color: #eee;";
            style += "margin: 5px 0px 5px 5px;";
        } else {
            style = "none;";
        }
        return style;
    }

    if (getMergedUnitDirection(unit) === "bottom") {
        style += "border-right: 1px solid #000;";
        style += "border-left: 1px solid #000;";
        style += "border-top: 0px solid #fff;";
        style += "border-bottom: 1px solid #000;";
        style += "border-bottom-left-radius: 0.5rem;";
        style += "border-bottom-right-radius: 0.5rem;";
        style += "border-top-left-radius: 0;";
        style += "border-top-right-radius: 0;";
        style += "background-color: #eee;";
        style += "margin: 0px 5px 5px 5px;";
    } else if (getMergedUnitDirection(unit) === "top") {
        style += "border-right: 1px solid #000;";
        style += "border-left: 1px solid #000;";
        style += "border-top: 1px solid #000;";
        style += "border-bottom: 0px solid #fff;";
        style += "border-top-left-radius: 0.5rem;";
        style += "border-top-right-radius: 0.5rem;";
        style += "border-bottom-left-radius: 0;";
        style += "border-bottom-right-radius: 0;";
        style += "background-color: #eee;";
        style += "margin: 5px 5px 0px 5px;";
    } else if (getMergedUnitDirection(unit) === "right") {
        style += "border-right: 0px solid #fff;";
        style += "border-left: 1px solid #000;";
        style += "border-top: 1px solid #000;";
        style += "border-bottom: 1px solid #000;";
        style += "border-top-right-radius: 0;";
        style += "border-bottom-right-radius: 0;";
        style += "border-top-left-radius: 0.5rem;";
        style += "border-bottom-left-radius: 0.5rem;";
        style += "background-color: #eee;";
        style += "margin: 5px 0px 5px 5px;";
    } else if (getMergedUnitDirection(unit) === "left") {
        style += "border-top: 1px solid #000;";
        style += "border-right: 1px solid #000;";
        style += "border-bottom: 1px solid #000;";
        style += "border-left: 0px solid #fff;";
        style += "border-top-left-radius: 0rem;";
        style += "border-bottom-left-radius: 0rem;";
        style += "background-color: #eee;";
        style += "margin: 5px 5px 5px 0px;";
    } else {
        style = "none;";
    }

    return style;
}

function firstUnitStyle(item) {
    let style = "";
    if (item.id == setUnitId) {
        style += "background-color: #0d6efd;";
    } else {
        style += "none;";
    }

    return style;
}

function updateSelectOptions() {
    console.log(selections)
    if (setUnitId) {
        const floorElement = document.querySelector(".empty-unit  input"); // انتخاب المان طبقه

        floorElement.setAttribute("data-id", setUnitId);
    }
    if (selections.length !== 0) {
        buildTitle.style.display = "none";
    } else {
        buildTitle.style.display = "block";
    }
    if (setUnitId) {
        emptyUnit.style.display = "flex";
        btnMergStyle.style.display = "block";
        removeUnit.style.display = "block";
        unitForm.style.display = "flex"; 
    } else {
        btnMergStyle.style.display = "none";
        emptyUnit.style.display = "none";
        removeUnit.style.display = "none";
        unitForm.style.display = "none"; 
    }

    if (isMerg) {
        btnCloseSuggest.style.display = "block";
    } else {
        btnCloseSuggest.style.display = "none";
    }
    const selectedUnit = selections
        .flatMap((floor) => floor.units)
        .find((unit) => unit.id == setUnitId);
    const selectedFloor = selections.find(
        (floor) => floor.floorNumber == selectedUnit?.floorNumber
    );
    if (
        selectedUnit?.name ||
        selectedUnit?.meterage ||
        selectedFloor?.floorName
    ) {
        inputUnitMeterage.value = selectedUnit.meterage || "";
        inputUnitName.value = selectedUnit.name || "";
        floorInputName.value = selectedFloor.floorName || "";
    } else {
        inputUnitMeterage.value = "";
        inputUnitName.value = "";
        floorInputName.value = "";
    }
    $("#floors").empty();

    for (var i = selections.length - 1; i >= 0; i--) {
        $("#floors").append(
            `<div class='floor-item col-12'>
                                                                                              <div class='unit-item-setting'>
                                                                                               
                                                                                                <button type="button" class="btn p-0" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                <i class='fa fa-ellipsis-v f-1'></i>
                                                                                              </button>
                                                                                                                                                                    <ul class="dropdown-menu p-1">

                                                                                                  <button class='btn btn-primary btn-sm remove-btn mb-2 w-100' data-id='${selections[
                i
            ]
                .id
            }'>حذف طبقه</button>
                                                                                                  <button class='btn btn-primary btn-sm add-btn-unit w-100'  data-id='${selections[
                i
            ]
                .id
            }'  data-params='${selections[i].floorNumber
            }'>افزودن واحد</button>
                                                                                              </ul>
                                                                                              </div>
                                                                                              <div class='units-list''>
                                                                                              ${selections[
                i
            ].units
                .map(
                    (
                        item
                    ) => `
                                                                                                        <div class='unit-item position-relative' id='unit-item${item.id
                        }' data-id='${item.id
                        }' style='${getUnitBorderStyle(
                            item
                        ) +
                        firstUnitStyle(
                            item
                        )
                        }'>
                                                                                                          <div class='d-flex position-relative'>
                                                                                                          ${item.mergedUnitId
                            ? `<button data-id='${item.id}' class='btn btn-danger btn-sm mx-2 p-1 btn-close-merg' style='font-size:10px '>لغو ادغام</button>`
                            : ""
                        }
                                                                                                        <div style='${item.id ==
                            setUnitId
                            ? "color: #fff;"
                            : ""
                        }'>
                                                                                                        <h6 style='font-size: 12px' class='mb-0'>
                                                                                                           نام:  ${item.name ||
                        "نامشخص"
                        }
                                                                                                        </h6>
                                                                                                        <span style='font-size: 12px'>متراژ: ${item.meterage ||
                        "نامشخص"
                        }</span>
                                                                                                        <span class='d-block' style='font-size: 12px'>طبقه: ${selections[
                            i
                        ]
                            .floorName ||
                        "نامشخص"
                        }</span>
                                                                                                        </div>
                                                                                                        
                                                                                                          </div>
                                                                                                      
                                                                                                        </div>
                                                                                                    `
                )
                .join(
                    ""
                )}
                                                                                            
                                                                                              </div>
                                                                                            </div>`
        );
    }
}
$(document).ready(function () {
    $("#add-floor").click(function () {
        var newObject = {
            id: Math.floor(Math.random() * 10000000),
            floorNumber: selections.length + 1,
            floorName: "",
            units: [
                {
                    // id?: Math.floor(Math.random() * 1000), 
                    // floorNumber: number, 
                    // mergedUnitId: null 

                    id: Math.floor(Math.random() * 10000000),
                    name: "",
                    mergedUnitId: null,
                    isEmptyUnit: false,
                    floorNumber: selections.length + 1,
                    meterage: 0,
                },
            ],
        };
        selections.push(newObject);
        updateSelectOptions();
    });
    $("#floors").on("click", ".btn-menu", function () {
        var param = $(this).data("id");
        var element = document.getElementById(param);
        if (element.style.display == "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });

    $("#floors").on("click", ".btn-close-merg", function () {
        var id = $(this).data("id");
        const selectedUnit = selections
            .flatMap((floor) => floor.units)
            .find((unit) => unit.id == id);
        if (selectedUnit) {
            selectedUnit.mergedUnitId = null;
        }
        isMerg = false;
        setUnitId = null;
        updateSelectOptions();
    });
    $("#floors").on("click", ".remove-btn", function () {
        var id = $(this).data("id");
        var index = -1;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i].id === id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            selections.splice(index, 1);

            // به‌روزرسانی شماره طبقه‌ها
            for (var i = 0; i < selections.length; i++) {
                selections[i].floorNumber = i + 1;
            }
        }

        updateSelectOptions();
    });
    $("#remove-unit").on("click", function () {

        for (var i = 0; i < selections.length; i++) {
            var unitIndex = selections[i].units.findIndex(function (unit) {
                return unit.id === setUnitId;
            });
            if (unitIndex !== -1) {
                selections[i].units.splice(unitIndex, 1);
                // بررسی تعداد واحدهای باقی‌مانده در طبقه       
                if (selections[i].units.length === 0) {
                    selections.splice(i, 1); // حذف طبقه            i--; // کاهش مقدار i برای مراقبت از انتقال به دسته بعدی
                }
            }
        }
        for (var i = 0; i < selections.length; i++) {
            selections[i].floorNumber = i + 1;
        }
        setUnitId = null;
        updateSelectOptions();
    });

    $("#floors").on("click", ".add-btn-unit", function () {
        var id = $(this).data("id");
        const floorNumber = $(this).data("params");
        const units = selections
            .flatMap((floor) => floor.units)
            .filter((a) => a.floorNumber == floorNumber);

        var newUnit = {
            id: Math.floor(Math.random() * 10000000),
            name: "",
            mergedUnitId: null,
            isEmptyUnit: false,
            floorNumber: floorNumber,
            meterage: 0,
        };

        for (var i = 0; i < selections.length; i++) {
            if (selections[i].id === id) {
                selections[i].units.push(newUnit);
            }
        }

        updateSelectOptions();
    });

    $("#floors").on("click", ".unit-item", function () {
        ////

        var id = $(this).data("id");

        //////
        const ee = selections
            .flatMap((floor) => floor.units)
            .find((unit) => unit.id == id);
        const findUnitId = selections
            .flatMap((floor) => floor.units)
            .map((unit) => unit.mergedUnitId);
        ////
        const mergedUnitId = ee.mergedUnitId;
        const mergedUnit = selections
            .flatMap((floor) => floor.units)
            .find((u) => u.id === mergedUnitId || u.mergedUnitId !== null);

        //////
        // if (mergedUnitIds.includes(id)) {
        //   console.log("Merged Unit ID:", id);
        // }

        if (ee.mergedUnitId == null && !findUnitId.find((a) => a == ee.id)) {
            if (id == setUnitId) {
                isMerg = false;
                setUnitId = null;
            } else {
                setUnitId = id;
            }
            if (setUnitId) {
                updateSelectOptions();
                const selectedUnit = selections
                    .flatMap((floor) => floor.units)
                    .find((unit) => unit.id == setUnitId);
                const checkboxElements = document.querySelectorAll('.empty-unit input[data-id]');

                checkboxElements.forEach((checkboxElement) => {
                    const setUnitId = checkboxElement.getAttribute("data-id");
                    const selectedUnit = selections
                        .flatMap((floor) => floor.units)
                        .find((unit) => unit.id == setUnitId);

                    // بروزرسانی وضعیت اولیه checkbox براساس وضعیت isEmptyUnit
                    checkboxElement.checked = selectedUnit.isEmptyUnit;

                    // ذخیره selectedUnit به عنوان ویژگی مربوط به checkbox
                    checkboxElement.selectedUnit = selectedUnit;

                    checkboxElement.addEventListener("change", function () {
                        checkboxElement.selectedUnit.isEmptyUnit = checkboxElement.checked;
                        updateCheckboxState(checkboxElement);
                    });
                });

                // بروزرسانی وضعیت checkbox در HTML براساس وضعیت isEmptyUnit
                function updateCheckboxState(checkboxElement) {
                    checkboxElement.checked = checkboxElement.selectedUnit.isEmptyUnit;
                }

            }

            updateSelectOptions();
        } else {
            return false;
        }
    });

    $("#close-suggest-unit").on("click", function () {
        if (isMerg) {
            isMerg = false;
            setUnitId = null;
        }
        updateSelectOptions();
    });
    $("#unit-add-info-btn").on("click", function () {
        const selectedUnit = selections
            .flatMap((floor) => floor.units)
            .find((unit) => unit.id == setUnitId);
        const selectedFloor = selections.find(
            (floor) => floor.floorNumber == selectedUnit.floorNumber
        );
        if (selectedUnit) {
            selectedUnit.name = String(inputUnitName.value);
            selectedUnit.meterage = Number(inputUnitMeterage.value);
        }
        if (selectedFloor) {
            selectedFloor.floorName = String(floorInputName.value);
        }
        inputUnitName.value = "";
        inputUnitMeterage.value = "";
        floorInputName.value = "";
        setUnitId = null;
        isMerg = false;
        updateSelectOptions();
    });

    $("#merg-unit").on("click", function () {
        isMerg = true;
        updateSelectOptions();

        const allElements = document.querySelectorAll(".units-list .unit-item");
        const clickedElement = document.getElementById("unit-item" + setUnitId);
        const findUnitId = selections
            .flatMap((floor) => floor.units)
            .map((unit) => unit.mergedUnitId);

        var clickedElementRect = clickedElement.getBoundingClientRect();
        var clickedElementTop = clickedElementRect.top;
        var clickedElementBottom = clickedElementRect.bottom;
        var clickedElementLeft = clickedElementRect.left;
        var clickedElementRight = clickedElementRect.right;

        var selectedAbove = null;
        var selectedBelow = null;
        var selectedLeft = null;
        var selectedRight = null;
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i] === clickedElement) {
                continue; // عنصر کلیک شده را رد کنید
            }

            var currentElementRect = allElements[i].getBoundingClientRect();
            var currentElementTop = currentElementRect.top;
            var currentElementBottom = currentElementRect.bottom;
            var currentElementLeft = currentElementRect.left;
            var currentElementRight = currentElementRect.right;

            var isAbove =
                currentElementBottom < clickedElementTop &&
                currentElementLeft === clickedElementLeft &&
                currentElementRight === clickedElementRight;
            var isBelow =
                currentElementTop > clickedElementBottom &&
                currentElementLeft === clickedElementLeft &&
                currentElementRight === clickedElementRight;
            var isLeft =
                currentElementRight < clickedElementLeft &&
                currentElementTop === clickedElementTop &&
                currentElementBottom === clickedElementBottom;
            var isRight =
                currentElementLeft > clickedElementRight &&
                currentElementTop === clickedElementTop &&
                currentElementBottom === clickedElementBottom;

            if (
                isAbove &&
                (!selectedAbove ||
                    currentElementTop > selectedAbove.getBoundingClientRect().top)
            ) {
                selectedAbove = allElements[i];
            }

            if (
                isBelow &&
                (!selectedBelow ||
                    currentElementBottom < selectedBelow.getBoundingClientRect().bottom)
            ) {
                selectedBelow = allElements[i];
            }

            if (
                isLeft &&
                (!selectedLeft ||
                    currentElementLeft > selectedLeft.getBoundingClientRect().left)
            ) {
                selectedLeft = allElements[i];
            }

            if (
                isRight &&
                (!selectedRight ||
                    currentElementRight < selectedRight.getBoundingClientRect().right)
            ) {
                selectedRight = allElements[i];
            }
        }

        // حذف کلاس "selected" از تمام عناصر
        for (var j = 0; j < allElements.length; j++) {
            allElements[j].classList.remove("selected");
        }

        if (isMerg) {
            if (selectedAbove) {
                const directionId = selectedAbove.getAttribute("data-id");
                const mergedUnitId = clickedElement.getAttribute("data-id");

                const ee = selections
                    .flatMap((floor) => floor.units)
                    .find((unit) => unit.id == directionId);

                if (ee.mergedUnitId == null && !findUnitId.find((a) => a == ee.id)) {
                    const isMergedDirection = selections
                        .flatMap((floor) => floor.units)
                        .some((unit) => unit.mergedUnitId == directionId);

                    if (!isMergedDirection) {
                        const targetFloor = selections.find((floor) =>
                            floor.units.some((unit) => unit.id == mergedUnitId)
                        );

                        if (
                            !targetFloor ||
                            targetFloor.units.every((unit) => unit.mergedUnitId == null)
                        ) {
                            selectedAbove.classList.add("selected");
                            selectedAbove.addEventListener("click", function () {
                                updateMergUnitId(mergedUnitId, directionId);
                                updateSelectOptions();
                            });
                        }
                    }
                } else {
                    return false;
                }
            }

            if (selectedBelow) {
                const directionId = selectedBelow.getAttribute("data-id");
                const mergedUnitId = clickedElement.getAttribute("data-id");

                const ee = selections
                    .flatMap((floor) => floor.units)
                    .find((unit) => unit.id == directionId);

                if (ee.mergedUnitId == null && !findUnitId.find((a) => a == ee.id)) {
                    const isMergedDirection = selections
                        .flatMap((floor) => floor.units)
                        .some((unit) => unit.mergedUnitId == directionId);

                    if (!isMergedDirection) {
                        const targetFloor = selections.find((floor) =>
                            floor.units.some((unit) => unit.id == mergedUnitId)
                        );
                        if (
                            !targetFloor ||
                            targetFloor.units.every((unit) => unit.mergedUnitId == null)
                        ) {
                            selectedBelow.classList.add("selected");
                            selectedBelow.addEventListener("click", function () {
                                updateMergUnitId(mergedUnitId, directionId);
                                updateSelectOptions();
                            });
                        }
                    }
                } else {
                    return false;
                }
            }

            if (selectedLeft) {
                const directionId = selectedLeft.getAttribute("data-id");
                var selectItemId = clickedElement.getAttribute("data-id");

                const ee = selections
                    .flatMap((floor) => floor.units)
                    .find((unit) => unit.id == directionId);

                if (ee.mergedUnitId == null && !findUnitId.find((a) => a == ee.id)) {
                    const isMergedDirection = selections
                        .flatMap((floor) => floor.units)
                        .some((unit) => unit.mergedUnitId == directionId);

                    if (!isMergedDirection) {
                        selectedLeft.classList.add("selected");
                        selectedLeft.addEventListener("click", function () {
                            updateMergUnitId(selectItemId, directionId);
                            updateSelectOptions();
                        });
                    }
                } else {
                    return false;
                }
            }

            if (selectedRight) {
                const directionId = selectedRight.getAttribute("data-id");
                var selectItemId = clickedElement.getAttribute("data-id");
                const ee = selections
                    .flatMap((floor) => floor.units)
                    .find((unit) => unit.id == directionId);

                if (ee.mergedUnitId == null && !findUnitId.find((a) => a == ee.id)) {
                    const isMergedDirection = selections
                        .flatMap((floor) => floor.units)
                        .some((unit) => unit.mergedUnitId == directionId);

                    if (!isMergedDirection) {
                        selectedRight.classList.add("selected");
                        selectedRight.addEventListener("click", function () {
                            updateMergUnitId(selectItemId, directionId);
                            updateSelectOptions();
                        });
                    }
                } else {
                    return;
                }
            }
        }
    });

    function updateMergUnitId(selectItemId, directionId) {
        const selectedUnit = selections
            .flatMap((floor) => floor.units)
            .find((unit) => unit.id == selectItemId);

        const FindUnit = selections
            .flatMap((floor) => floor.units)
            .find((unit) => unit.id == directionId);

        if (selectedUnit) {
            selectedUnit.mergedUnitId = Number(directionId);
            selectedUnit.meterage = FindUnit.meterage + selectedUnit.meterage
        }
        if (FindUnit) {
            FindUnit.meterage = selectedUnit.meterage
        }
        setUnitId = null;
        isMerg = false;
    }

    var inputId = document.getElementById('id-edit-building');


    if (inputId.value) {


        $.ajax({
            type: "POST",
            url: '/admin/Estate/GetById?id=' + inputId.value,
            contentType: false,
            processData: false,
            success: function (data) {




                data.floorsForShow.forEach(obj => {
                    var objectValues = Object.values(obj)
                    selections.push(obj)
                })
                updateSelectOptions()
            },
            error: (e) => {
                console.log(e)
            }
        });

        //const res = fetch()

    }
});



toastr.options = {
    timeOut: 4345,
    progressBar: true,
    showMethod: "slideDown",
    hideMethod: "slideUp",
    showDuration: 200,
    hideDuration: 200
};
let loading = $('.modal-loading')
var table;
var deleted = false;
let formUrl;
let typeId;
let userId;
let userName;
let rowIdCustomer;
$(function () {
    $("body").addClass("sticky-page-header");
    $('input[name="id"]').val(new URLSearchParams(window.location.search).get('id'));
    $('#Image').change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "webp")) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#thumbimage').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#Image').attr('src', '/Uploads/tempimage.jpg');
        }
    });


});

var KTDocsAdd = function () {
    var map, marker = null;
    const locationChanged = function (e) {
        fetch(`https://api.neshan.org/v4/reverse?lat=${e.lat}&lng=${e.lng}`, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': 'service.6JJqS1dMExBteluzRuL4zlIDzVXb7cieW2FO3SBI'
            },
        }).then(response => response.json())
            .then(result => {
                document.getElementById('Lat').value = e.lat;
                document.getElementById('Long').value = e.lng;
                let addressElement = document.getElementById('Province');
                addressElement.value = result.formatted_address;
                //KTUtil.scrollTo(addressElement, 150);
                //addressElement.focus();
            }).catch(error => console.log(error));
    };


    return {
        init: function () {
            const defaultLat = document.getElementById('Lat').value == '' ? 36.467240 : document.getElementById('Lat').value;
            const defaultLng = document.getElementById('Long').value == '' ? 52.844797 : document.getElementById('Long').value;
            map = new L.Map('map', {
                key: 'web.DvgRmwDJDGt5lyqNPnYQ8FOkyIaofLrShHKDennS',
                maptype: 'standard-day',
                poi: true,
                traffic: false,
                center: [defaultLat, defaultLng],
                zoom: 14
            });
            if (document.getElementById('Lat').value != '' && document.getElementById('Long').value != '') {
                let latlng = new L.LatLng(defaultLat, defaultLng);
                marker = L.marker(latlng)
                    .bindPopup(`<span class="font-sans-serif"><b>مختصات جغرافیایی:</b><br>${latlng.toString()}</span>`)
                    .addTo(map);
                map.flyTo(latlng, 13);
            }
            map.on('click', (e) => {
                if (marker == null) {
                    marker = L.marker(e.latlng)
                        .bindPopup(`<span class="font-sans-serif"><b>مختصات جغرافیایی:</b><br>${e.latlng.toString()}</span>`)
                        .addTo(map);
                } else {
                    marker.setLatLng(e.latlng);
                }
                map.flyTo(e.latlng, 13);
                locationChanged(e.latlng);
            });
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTDocsAdd.init();
}));



$('#submit-formCreate').on('click', function () {
    //let form = document.getElementById('formCreate');
    //let formdata = new FormData(form);
    //formdata.append("Description", theEditor.getData());
    //loading.css({
    //    display: 'block'
    //})
    //$("p").prepend("<b>Loading...</b>. ");

    //$.ajax({
    //    url: '/admin/Estate/Upsert',
    //    data: formdata,
    //    method: 'POST',
    //    processData: false,
    //    contentType: false,
    //    success: function (data) {
    //        form.reset();
    //        !data.succeeded ? Swal.fire('', data.errors[i], 'error') : Swal.fire('', data.message, 'success');
    //        loading.css({
    //            display: 'none'
    //        })


    //        window.location = "/admin/Estate/Index"
    //    }
    //})
    let form = document.getElementById('formCreate');
    let formdata = new FormData(form);
    formdata.append("Description", theEditor.getData());
    let building = {
        floorCount: selections.length,
        floors: selections
    }
    formdata.append("floorCount", building.floorCount);

    formdata.append("floors", JSON.stringify(building.floors));

    $.ajax({
        url: '/admin/Estate/Upsert',
        data: formdata,
        method: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            form.reset();
            !data.succeeded ? Swal.fire('', data.errors[i], 'error') : Swal.fire('', data.message, 'success');
            loading.css({
                display: 'none'
            })


            window.location = "/admin/Estate/Index"
        }
    })
});

$('#submit-formEdit').on('click', function () {
    let form = document.getElementById('formCreate');
    let formdata = new FormData(form);
    formdata.append("Description", theEditor.getData());
    let building = {
        floorCount: selections.length,
        floors: selections
    }
    formdata.append("floorCount", building.floorCount);

    formdata.append("floors", JSON.stringify(building.floors));

    loading.css({
        display: 'block'
    })
    $.ajax({
        url: '/admin/Estate/Upsert',
        data: formdata,
        method: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            form.reset();
            !data.succeeded ? Swal.fire('', data.errors[i], 'error') : Swal.fire('', data.message, 'success');
            loading.css({
                display: 'none'
            })
            console.log(data);
            window.location = "/admin/Estate/Index"
        }
    })
});
