var importJs=document.createElement('script')  //在页面新建一个script标签
importJs.setAttribute("src", 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js') //给script标签增加src属性， url地址为cdn公共库里的
document.getElementsByTagName("head")[0].appendChild(importJs) //把importJs标签添加在页面

var isAsc = false;
var thState = new Array();
var thStateNum = 0;

$(document).ready(function(){
    $("th").on('click', ascOrDesc).append("<span class='sortImg'></span>");
    $("th").each(function(){
        thState.push(0);
    })
})
//是否是升序排列
function ascOrDesc(){
    thStateNum = $("th").index($(this));
    if(thState[thStateNum]==0){
        ascSort.call(this);
    }
    else{
        descSort.call(this);      
    }
}
//升序
function ascSort(){  
    resetThisTable.call(this);
    thState[thStateNum]=1;   
    $(this).find(".sortImg").text('up');
    //console.log('AscSort');
    isAsc = true;
    sortTable.call(this); 
}
//降序
function descSort(){  
    resetThisTable.call(this);
    thState[thStateNum]=0;  
    $(this).find(".sortImg").text('down');
    //console.log('descSort');
    isAsc = false;
    sortTable.call(this); 
}

function resetThisTable(){
    //console.log('reset');
    $(this).parents('table').find('th').find(".sortImg").text('');
    for(var i=0 ; i<thState.length ; i++)
        thState[i] = 0;
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
    console.log('type= ' + typeof(toBeSort[0]));
    console.log('type= ' + typeof(tdValues[selectedCol]));
    if(typeof(toBeSort[0])=='number'){
        toBeSort.sort(sortNumber);
    }
    else{
        toBeSort.sort();
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
    return a - b
}