import {TextTransform} from "./TextTransform";



describe("testing text transform pipe",()=>{
    let instance=new TextTransform();
    let str="hello world";
    it("capitalizing",()=>{
        expect(instance.transform(str)).toEqual("HelloWorld");
    })

    it("camelcase",()=>{
        expect(instance.transform(str,"camelcase")).toEqual("helloWorld");
    })

   
});