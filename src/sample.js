let d1=new Date();
let t1=d1.getTime();
console.log(t1);
let str="https://stackoverflow.com/questions/30993836/paste-content-as-plain-text-in-summernote-editor";
let result=[];
let count=1;
result.push(str[0]);
for(let i=0;i<str.length;i++){
    if(str[i]==str[i+1]){
        count++;
    }else{
        if(count>1){
            result.push(count);
        }
        count=1;
        result.push(str[i+1]);
    }
}
let d2=new Date();
let t2=d2.getTime();
console.log(t2);
console.log(result.join(""));
console.log(t2-t1);

