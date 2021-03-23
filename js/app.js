'use strict';
let objArrOne = [];
let objArrTwo = [];
let keyWord = [];
let keyWordTwo = [];
let inx = 0;
function Animals(bigObjArr) {
    for (let key in bigObjArr) {
        this[key] = bigObjArr[key]
    }
    this.id = inx;
    inx++;
}
let container;
Animals.prototype.renderDivs = function () {
    $('section').hide();
    $('div').show();
    container = $('#photo-template').clone();
    container.attr('id', this.id);
    $('main').append(container);
    container.find('h2').text(this.title);
    container.find('img').attr('src', this.image_url);
    container.find('p').text(this.keyword);
    $('#photo-template').hide();

}
let n = 0;
Animals.prototype.renderSection = function () {

    let template = $('#tempOne').html();
    let html = Mustache.render(template, objArrTwo[n]);
    // template.find('img').attr('src', this.image_url)
    $('section').attr('src', n + 20)
    n++
    return html;
}

let addOptionOne = function () {
    $('#select').empty();
    console.log($('#select'))
    let mainOption = $('<option></option>');
    $('#select').append(mainOption);
    mainOption.text('Filter by Keyword');
    objArrOne.forEach(element => {
        
        if (!keyWord.includes(element.keyword)) {
            keyWord.push(element.keyword)
            
            let newOption = $('<option></option>');
            $('#select').append(newOption);
            newOption.text(element.keyword);
        }
        
    });
}

let addOptionTwo = function () {
    $('#select').empty();
    let newOption = $('<option></option>');
    $('#select').append(newOption);
    newOption.text('Filter by Keywords');
    objArrTwo.forEach(element => {
    
        if (!keyWordTwo.includes(element.keyword)) {
            keyWordTwo.push(element.keyword)
            let newOption = $('<option></option>');
            $('#select').append(newOption);
            newOption.text(element.keyword);
        }
    });    
    
}

function renderOne() {
    $('#select').on('change', function () {
        let selected = $('#select').val();
        for (let i = 0; i < objArrOne.length; i++){
            // $('#' + element.id).hide();
            if (selected == 'Filter by Keyword') {
                $('#' + i).show();
            } else if (selected == objArrOne[i].keyword) {
                $('#' + i).show();
            }else{
                $('#' + i).hide();
            }
        };
        console.log(selected)
    })
}

function renderTwo() {
    $('#select').on('change', function () {
        let selected = $('#select').val();
        for (let i = 20; i < 40; i++){
            $('section#' + i).hide();
            if (selected == 'Filter by Keywords') {
                $('#' + i).show();
            } else if (selected == objArrTwo[i].keyword) {
                $('#' + i).show();
            }else{
                $('#' + i).hide();
            }
        };
        $('div').hide();
    })
}

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};
$.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(element => {
        let firstAnimal = new Animals(element);
        objArrOne.push(element)
        firstAnimal.renderDivs();
    });
    addOptionOne();
}
);

let buttonOne = $('<button>Page One</button>');
$('header').append(buttonOne);
buttonOne.on('click', function () {
    addOptionOne();
    $('section').hide();
    $('div').show();
    $('#photo-template').hide();
    
});
renderOne();




const ajaxSetting = {
    method: 'get',
    dataType: 'json'
};
$.ajax('data/page-2.json', ajaxSetting).then(datas => {
    datas.forEach(element => {
        let secondAnimal = new Animals(element);
        objArrTwo.push(element)
        $('main').append(secondAnimal.renderSection());
        console.log('hello')
        $('section').hide();
    })

})

let buttonTwo = $('<button>Page Two</button>');
$('header').append(buttonTwo);
buttonTwo.on('click', function () {
    $('#select').empty();
    addOptionTwo();
    $('div').hide();
    $('section').show();
    renderTwo()
    console.log(objArrOne)
    console.log(objArrTwo)

})
