import axios from 'axios'
import fs from 'fs'
import Path from 'path'
const https = require('https');

let path: string = './src/images/'
console.log(`Start downloading...`)
async function downloadImage(url: string, path: string) {
   await axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    })
    .then(async function (response) {
        await response.data.pipe(fs.createWriteStream(path))
    });
}

async function getData(Start: number, End: number) {
    for(Start; Start <= End; Start++){
        console.log(Start)
        try{
            await axios.get(`https://yande.re/post.json?page=${Start}&tags=shinomiya_kaguya`)
                .then(async response => {
                    for (let i = 0; i < response.data.length; i++) {
                        await downloadImage(response.data[i].file_url, `${path}page_${Start}_${i}.jpg`)
                        console.log(`${i}/${response.data.length} : ${response.data[i].file_url}`)
                    }
                })
        }catch(err){
            console.log(`Error : Axios`)
        }
    }
}

getData(3,4)