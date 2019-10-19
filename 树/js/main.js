function makeTree()
{
	var txt=document.getElementById("txt1").value
	if(txt=="")
    {
		alert("输入文本不能为空!");
	}
	else
    {
		var array=txt.split("\n")//分割行数组
		var treeData=[];//树形数据
		var nullLine=false;//是否为空行
		var num=0;//一行元素的唯一id
		var pid1=0;//子节点数据
		for(var i=0; i<array.length; i++)//循环添加树形数据
        {
			if(i==0)
            {
				var obj={};//第一行添加一个大节点，如导师节点
				num++;//唯一节点标记加1
				obj.id=num;//设置节点id
				obj.title=array[i].split("：")[0]+"_"+array[i].split("：")[1]//设置节点标
				obj.pid=0;//设置为0时候，代表是大节
				pid1=num;//记录子节点的pid
				treeData.push(obj);
			}
			else
            {
				if(array[i].length<1)
                {
					nullLine=true;//遇到空行时，设置空行为true，方便下一行添加一个大节点
				}
				else
                {	
					if(nullLine)
                    {
                        var obj={};//当上一行为空行时，添加一个大节点
                        num++;//唯一节点标记加1
                        obj.id=num;//设置节点id            
                        obj.title=array[i].split("：")[0]+"_"+array[i].split("：")[1] //设置节点标题
                        obj.pid=0;//设置为0时候，代表是大节点
                        pid1=num//记录子节点的pid
                        treeData.push(obj)//添加大节点	
					}
					else
                    {
                        var obj={};
                        num++;//唯一节点标记加1
                        obj.id=num;//设置节点id
                        obj.title=array[i].split("：")[0]//设置节点标
                        obj.pid=pid1;//设置子节点的pid为父节点的pid
                        treeData.push(obj)//添加子节点
                        var arr1=array[i].split("：")[1].split("、");//添加子节的子节点
                        var pid2=num; //记录父节点的pid
                        for(var j=0;j<arr1.length;j++)//循环添加子节点
                        {		
                            var obj={};
                            num++;
                            obj.id=num;
                            obj.title=arr1[j]
                            obj.pid=pid2;
                            treeData.push(obj)
                        }
					}				
					nullLine=false;//空行设置为false;
				}
			}	
		}
		document.getElementsByClassName("f-tree").item(0).innerHTML="";//设置容器内容为空
		config.tree({type:0,wrapper:'.f-tree',data:treeData});//生成树节点
	}
    //console.log(array);
    //console.log(arr1);
}