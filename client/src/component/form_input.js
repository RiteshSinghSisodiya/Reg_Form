import userApi from "../server/userApi";
class Form{
    constructor(){
        this.educationCounter=0;
        this._form=document.getElementById("registrationForm");
        this._btn=document.querySelector(".eduBtn");
        this.addEventListeners();
    }
    addEventListeners(){
        this._form.addEventListener("submit",this.handleSubmit.bind(this));
        this._btn.addEventListener("click",this.addEdu.bind(this));
    }
    addEdu(){
        this.educationCounter++;

      const educationFields = document.getElementById('educationFields');

      const newEducationField = document.createElement('div');
      newEducationField.innerHTML = `
        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="degree${this.educationCounter}">Degree</label>
                <input type="text" class="form-control" id="degree${this.educationCounter}" name="degree${this.educationCounter}" required>
            </div>
            <div class="form-group col-md-3">
                <label for="school${this.educationCounter}">School/University</label>
                <input type="text" class="form-control" id="school${this.educationCounter}" name="school${this.educationCounter}" required>
            </div>
            <div class="form-group col-md-3">
                <label for="marks${this.educationCounter}">Marks(in %age)</label>
                <input type="number" min="0" max="100" class="form-control" id="marks${this.educationCounter}" name="marks${this.educationCounter}" required>
            </div>
            <div class="form-group col-md-3">
                <label for="year${this.educationCounter}">Passing Year</label>
                <input type="number" min="1980" max="2099" class="form-control" id="year${this.educationCounter}" name="year${this.educationCounter}" required>
            </div>
        </div>`;
        educationFields.appendChild(newEducationField);
    }
  
    async handleSubmit(e){
        e.preventDefault();
        //data for training collection
        let training={
            domain:this._form.elements.trainingDomain.value,
            period:this._form.elements.trainingPeriod.value,
        };

        try{
          training=await userApi.createTraining(training);   
        }
        catch(err){
            console.log("Posting training error: ",err);
        }

        //data from education
        let education = [],edObj;
        for (let i = 1; i <=this.educationCounter; i++) {
            let degreeField = document.getElementById(`degree${i}`);
            let schoolField = document.getElementById(`school${i}`);
            let marksField = document.getElementById(`marks${i}`);
            let yearField = document.getElementById(`year${i}`);
        
            let det = {
                degreeName: degreeField.value,
                collegeName: schoolField.value,
                percentage: marksField.value,
                passingYear: yearField.value,
            };
            education.push(det);
        }

        
        try {
            edObj=await userApi.createEducation(education);
            console.log(edObj);
        } catch (error) {
            console.log("Posting education error: ",error);
        }
        
        //data for user collection
        let Gender;
        if(document.querySelector("#male").checked){
            Gender="Male"
        }
        else{
            Gender="Female";
        }
        let myaddress=this._form.elements.address.value+", "
                        +this._form.elements.city.value+", "
                        +this._form.elements.state.value+", "
                        +this._form.elements.pincode.value+", "
                        +this._form.elements.country.value;
        const user={
            name:this._form.elements.name.value,
            email:this._form.elements.email.value,
            password:this._form.elements.password.value,
            phone:this._form.elements.phone.value,
            gender:Gender,
            dob:this._form.elements.dob.value,
            bloodGroup:this._form.elements.bloodGroup.value,
            Address:myaddress,
            trainingDomainId:training.data._id,
            educationId:edObj.data._id,
        };

        try {
            await userApi.createUsers(user);
        } catch (error) {
            console.log("Posting user error: ",error);
        }
        

        this._form.elements.name.value="";
        this._form.elements.email.value="";
        this._form.elements.password.value="";
        this._form.elements.phone.value="";
        this._form.elements.dob.value="";
        this._form.elements.bloodGroup.value="";
        document.querySelector("#male").checked=false;
        document.querySelector("#female").checked=false;
        this._form.elements.address.value="";
        this._form.elements.city.value="";
        this._form.elements.state.value="";
        this._form.elements.pincode.value="";
        this._form.elements.country.value="";
        this._form.elements.trainingDomain.value="";
        this._form.elements.trainingPeriod.value="";
        this.educationCounter=0;
        document.getElementById('educationFields').innerHTML="";
    }
}
export default Form;