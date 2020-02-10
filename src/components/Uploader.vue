<template>
  <div id="app">

    <div class="drop" v-cloak @drop.prevent="dragAddFiles" @dragover.prevent>
      <h1>Drop files</h1>
    </div>

    <div class="uploadFiles">
      <button id="btn" v-on:click="uploadFiles()">Upload</button>
    </div>


      <div class="items">

        <div class="">
          <label>
            <input type="file" id="files" ref="files" accept="image/jpeg, image/png, application/pdf" multiple v-on:change="handleFilesUpload()"/>
          </label>
        </div>

        <div class="tabFiles" >
          <div v-for="(file, i) in files" class="file-listing">
            <span style=" font-family: arial">{{ i + 1 + "). "}}</span>
            <span style=" font-family: arial">{{ file.name }}</span>
            <progress max="100" :value.prop="uploadPercentage"></progress>
            <span class="remove-file" v-on:click="removeFile( i )"> &times;</span>
          </div>
        </div>

      </div>




  </div>
</template>

<script>
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        files: [],
        uploadPercentage: 0
      }
    },
    /*
      Defines the method used by the component
    */
    methods: {

    progressUpload(){
      var xhr = new XMLHttpRequest();

      // обработчик для отправки
      xhr.upload.onprogress = function(event) {
        log(event.loaded + ' / ' + event.total);
      }
    },
      uploadFiles(){
        if(!this.isUpload){
          this.$refs.files.click();

          }
        else {
          /*
            Submits files to the server
          */
          let formData = new FormData()
          /*
            Iteate over any file sent over appending the files
            to the form data.
          */
          for( var i = 0; i < this.files.length; i++ ){
            let file = this.files[i];
            formData.append('files[' + i + ']', this.file);
          }
          /*
            Make the request to the POST /select-files URL
          */
          axios.post( 'http://example.com/upload',
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: function ( progressEvent ){
                this.uploadPercentage = parseInt(Math.round(progressEvent.loaded / progressEvent.total)*100);
              }.bind(this)
            }
          ).then(function(){
            console.log('SUCCESS!!');
            this.files = []

          })
          .catch(function(){
            console.log('FAILURE!!');
          });


          this.isUpload = false
        }
      },

     dragAddFiles(file) {
     let droppedFiles = file.dataTransfer.files;

     if(!droppedFiles) return;
     // this tip, convert FileList to array
     this.isUpload = true;
     ([...droppedFiles]).forEach(f => {
       let ext = f.name.split('.').pop()
         if (ext == 'pdf' || ext == 'jpg' || ext == 'png') {
           this.files.push(f);
         }
        });
      },



      /*
        Handles the uploading of files
      */
      handleFilesUpload(){
      //  this.files = this.$refs.files.files;
      //  this.isUpload = true;

        // + drag n drop

        var uploadedFiles = this.$refs.files.files;
        this.isUpload = true;



          //Adds the uploaded file to the files array

        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      /*
        Removes a select file the user has uploaded
      */
      removeFile( i ){
        this.files.splice( i, 1 );
      }
    }
  }
</script>


<style>
  *{
    margin: 0;
    padding: 0;
    }
  #app{
    margin-top: 2vh;
    min-height: 98vh;
  }
  .drop{
    margin: 0 auto;
    width: 30%;
    height: 10%;
    border: 2px dashed #bbb;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 50px;
    text-align: center;
    font: 10pt bold arial;
    color: #bbb;
    transition: .7s;
  }
  .drop:hover{
    border: 2px dashed #007700;
    color: #000;
  }

  .uploadFiles{
    margin: 30px;
    display: flex;
    justify-content: center;

  }
  button{
      background: #fff;
      text-transform: uppercase;
      color: #009900;
      padding: 15px 30px;
      text-decoration: none;
      border: 2px solid #007700;
      border-radius: 5px;
      position: relative;
      font-weight: 500;
      font-size: 20px;
      transition: .5s;
  }
  button:hover{
    cursor: pointer;
    background: #009900;
    color: #fff;
  }
  .tabFiles{
    margin: 0 auto;
    max-width: 800px;
    min-width: 100px;
    font-size: 20px;
    line-height: 30px;
  }
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  span{
    word-break: break-all;
  }
  span.remove-file{
    font-family: arial;
    color: black;
    cursor: pointer;
    float: right;
    font-weight: bold;
    transition: .5s;
  }
  span.remove-file:hover{
    color: red;
  }
@media (max-device-width: 800px) {
  .drop{
    display: none;
  }
  button{
      color: #0066ff;
      border: 2px solid #0033cc;
  }
  button:hover{
    background: #0066ff;
  }
}
</style>
