$(document).ready(function(){
    $("th").on('click', ascSort).append("<img src='descend.png' align='right' class='sortImg'>");

})
//是否是升序排列
var isAsc = false;
//升序
function ascSort(){
    resetThisTable.call(this);
    $(this).find(".sortImg").attr('src', 'ascend.png');
    $(this).off('click').on('click', descSort);
    $(this).css('background-color', 'rgb(180, 212, 224)');
    console.log('AscSort');
    isAsc = true;
    sortTable.call(this);
}
//降序
function descSort(){
    resetThisTable.call(this);
    $(this).find(".sortImg").attr('src', 'descend.png');
    $(this).off('click').on('click', ascSort);
    $(this).css('background-color', 'rgb(180, 212, 224)');
    console.log('descSort');
    isAsc = false;
    sortTable.call(this);
}

function resetThisTable(){
    $(this).parents('table').find('th').css('background-color', 'rgb(2, 2, 112)').off('click').on('click', ascSort).find(".sortImg").attr('src', 'descend.png');
}

function sortTable(){
    //获取所有表值
    var tdValues = new Array();
    $(this).parents('table').find('td').each(function(){
        tdValues.push($(this).text());
        $(this).text('');
    });
    //console.log('tdValues= '+tdValues);
    //以选中列的元素作为该行代表 加入toBeSort中排序
    var len = tdValues.length;
    var colNum = $(this).parent().children().length;
    var selectedCol = $(this).index();
    var toBeSort = new Array();
    for(var i=selectedCol ; i<len ; i+=colNum){
        toBeSort.push(tdValues[i]);
    }
    //是否为数字类型
    if(isNaN(parseFloat(toBeSort[0].split('-').join('')))==false){
        toBeSort.sort(sortNumber);
        console.log('numbersort');
    }
    else{
        toBeSort.sort();
        console.log('sort');
    }
    //升序还是降序
    if(!isAsc)
        toBeSort.reverse();
    //console.log('toBeSort= '+toBeSort);
    //根据toBeSort的顺序 将原表值按顺序push进finalOrder中
    var finalOrder = new Array();
    var finalOrderPos = 0;
    for(var i=0 ; i<toBeSort.length ; i++){
        var posIntdValues = $.inArray(toBeSort[i], tdValues);
        var order = Math.floor(posIntdValues/colNum);
        //console.log('order= '+ order);
        for(var j=order*colNum ; j<(order+1)*colNum ; j++){
            finalOrder[finalOrderPos] = tdValues[j];
            finalOrderPos++;
        }
    }
    //console.log('finalOrder= '+finalOrder);
    //将finalOrder值填入表中
    finalOrderPos = 0;
    $(this).parents('table').find('td').each(function(){
        //console.log('FOP='+finalOrderPos+' FO[FOP]= '+finalOrder[finalOrderPos]);
        $(this).text(finalOrder[finalOrderPos]);
        finalOrderPos++;
    })
}

function sortNumber(a,b)
{
    return parseInt(a.split('-').join('')) - parseInt(b.split('-').join(''));
}