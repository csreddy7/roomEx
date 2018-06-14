import {Pipe ,PipeTransform} from "@angular/core";


@Pipe({
    name:"textTransform"
})
export class TextTransform implements PipeTransform{

    transform(value:string,type?:string){
        if(type){
            if(type==="camelcase"){
              return  camelCase();
            }else{
              return  capitalize();
            }
        }else{
           return capitalize();
        }
        function capitalize(){
            let arr=value.split(" "),str="";
            str=arr.reduce((oldValue,newValue)=>{
                oldValue+=newValue[0].toUpperCase()+newValue.substr(1);
                return oldValue;
            },"");
            return str;    
        }
        function camelCase(){
            let str=capitalize();
            return str[0].toLowerCase()+str.substr(1);
        }
    }
}