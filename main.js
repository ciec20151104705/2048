/**
 * Created by s20151104705 on 2018/5/11.
 */
var board = new Array;
var score = 0;
$(document).read(function()
{
    newgame();
});
function newgame()
{
    //初始化棋盘格
    init();
    generateOneNumber();
    generateOneNumber();
}
function init()
{
    for(var i=0;i<4;i++)
    {
        for (var j =0;j<4;j++)
        {
            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
        for(var i=0;i<4;i++)
        {
            board[i]=new Array();
            for(var j=0;j<4;j++)
            {
                board[i][j]=0;
            }
        }
    }

    updateBoardView();
}
function updateBoardView()
{
    $("number-cell").remove();
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            $("#grid-container").append('<div class="number-cell"id="number-cell-'+i+'-'+j+'"></div>')
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]==0) {
                theNumberCell.css('width', 'opx');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else
            {
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j])) ;
                theNumberCell.css('color',getNumberColor(board[i][j]) );
                theNumberCell.text(board[i][j]);
            }
        }
    }

    function  generateOneNumber()
    {
        if(nospace(board))
        {
            return false;
        }
        //随机位置
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
        while(true)
        {
            if(board[randx][randy]==0)
            {
                break;
            }
            var randx=parseInt(Math.floor(Math.random()*4));
            var randy=parseInt(Math.floor(Math.random()*4));
        }
        //随机生成数字
        var randNumber=Math.random()<0.5?2:4;
        //在随机位置上显示数字
        board[randx][randy]=randNumber;
        showNumberWithAnimation(randx,randy,randNumber);

        return true;
    }
 }
$(document).onkeydown(function(event)
{
    switch (event.keyCode)
    {
        case 37:
            if(moveLeft())
            {
                generateOneNumber();
                isganeover();
            }
            break;
        case 38:
            if(moveUp())
            {
                generateOneNumber();
                isganeover();

            }
            break;
        case 39:
            if(moveRight())
            {
                generateOneNumber();
                isganeover();

            }
            break;
        case 40:
            if(moveeDown())
            {
                generateOneNumber();
                isganeover();
            }
            break;
        default:
            break;
    }
});
function moveleft()
{
    if(!canMoveLeft(board))
    return fase;
    for(var i = 0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(board[i][j]!=0)
            {
                for(var k =0;k<j;k++)
                {
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board))
                    {
                        //move
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board))
                    {
                        //move
                        //add
                        continue;
                    }
                }
            }
        }
    }
}