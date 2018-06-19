/**
 * 將項目中的所有簡體轉成繁體
 */
const fs = require('fs');
const simpChar = require('./data.js').simpChar;
const tradChar = require('./data.js').tradChar;

var simp2trad = function(path){
    this.path = path;
}

simp2trad.prototype = {
    start: async function(){
        //Get all files
        var files = await this.getFiles();
        var _this = this;
        files.forEach(function(path){
            console.log('Translating: ' + path);
            _this.scanFile(path);
        })

        console.log('Translate successfully ('+files.length+' files have been traslated). ')
    },
    scanFile: function(path){
        var content = fs.readFileSync(path).toString();
        //获取中文
        var chinese = content.match(/[\u4e00-\u9fa5]/g);
        if (chinese){
            for (var item in chinese) {
                var str = '';
                if (simpChar().indexOf(chinese[item]) != -1) {
                    str = tradChar().charAt(simpChar().indexOf(chinese[item]));
                    content = content.replace(chinese[item],str);
                }
            }

           this.writeFile(path,content);
        }
    },
    writeFile: function(path,content){
        fs.writeFileSync(path,content);
    },
    getFiles: function (){
        var _this = this;
        var fileList = [];
        return new Promise(function(resolve,reject){
            var fileQueue = [];
            fileQueue.push(_this.path);
            while(fileQueue.length > 0){
                var cur = fileQueue.shift();
                var pa = fs.readdirSync(cur); 
                pa.forEach(function(ele,index){  
                    var info = fs.statSync(cur+"/"+ele)      
                    if(info.isDirectory()){  
                        fileQueue.push(cur+"/"+ele);
                    }else{  
                        fileList.push(cur + "/" + ele);
                    }     
                })  
            }
            resolve(fileList);
        })
    }
}

// var tool = new simp2trad(path);
// tool.start();

module.exports = simp2trad;