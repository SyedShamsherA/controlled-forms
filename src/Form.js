import React, {Component} from 'react';

class ControlledComponent extends Component {
    constructor() {
        super();
        this.state={
            fields: { 
            Name : '',
            Contact : '',
            Email : '',
            Rating : '',
            textarea:''},
            errors : {
                Name : '',
                Contact : '',
                Email :'',
                Rating : '',
                textarea:''
            },
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        var errkeys = await Object.keys(this.state.fields).filter((key) =>{
            if (this.state.fields[key] == '' && this.state.fields[key] != 'errors') {
                return key;
            }
        });
        if (errkeys.length >= 1) console.warn("Please fill all fields");
        else console.log(this.state.fields);
    }

    handleChange = async (e) => {
        var errors = { ...this.state.errors };
    
        if (e.target.value === '') {
          errors[e.target.name] = 'Mandatory Field';
        } else {
          errors[e.target.name] = '';
        };
        var fields = { ...this.state.fields };
        fields[e.target.name] = e.target.value;
        await this.setState({ errors , fields });
    };

    handleValidation() {
          let fields = this.state.fields ;
          let errors = {} ;
          let formIsValid = true ;

          if(!fields["Email"]) {
              formIsValid = false;
              errors["Email"] = "cannot be empty";
          }

          if (typeof fields["Email"] !== "undefined") {
            let lastAtPos = fields["Email"].lastIndexOf("@");
            let lastDotPos = fields["Email"].lastIndexOf(".");
      
            if (
              !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                fields["Email"].indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                fields["Email"].length - lastDotPos > 2
              )
            ) {
              formIsValid = false;
              errors["Email"] = "Email is not valid";
            }
          }

          if (typeof fields["Contact"] !== "undefined") {
             var pattern = new RegExp(/^[0-9\b]+$/);
              if (!pattern.test(fields["Contact"])) {
               formIsValid = false;
              errors["Contact"] = "Please enter only number.";
              } else if(fields["Contact"].length != 10){
                 formIsValid = false;
              errors["Contact"] = "Please enter valid phone number.";
          
            }
        }
    };


 render () {
     return (
< >
<div>
    <h3>Feedback Form</h3>
    <hr />
    <form  onSubmit={this.handleSubmit}>
        <div>
        <label>Name</label>
        <input type="text" name="Name" value={this.state.fields.Name}
                onChange={(e) => this.handleChange(e)}/>
        <br />
        <span style={{ color: 'red' }}>{this.state.errors.Name}</span></div>
        <br />
         <div>       
        <label>Contact</label>
        <input type="number" name="Contact" value={this.state.fields.Contact}
                onChange={(e) => this.handleChange(e)}/>
        <br />
        <span style={{ color: 'red' }}>{this.state.errors.Contact}</span></div>
        <br />
        <div>
        <label>Email</label>
        <input type="email" name="Email" value={this.state.fields.Email}
                onChange={(e) => this.handleChange(e)}/>
        <br />
        <span style={{ color: 'red' }}>{this.state.errors.Email}</span></div>
        <br />
        <div>
        <label>Rating</label>
        <label><input type="radio" name="Rating" value="1"  onChange={(e) => this.handleChange(e)}/>1</label>
      <label>  <input type="radio" name="Rating" value="2"  onChange={(e) => this.handleChange(e)}/>2</label>
       <label> <input type="radio" name="Rating" value="3"  onChange={(e) => this.handleChange(e)}/>3</label>
       <label> <input type="radio" name="Rating" value="4"  onChange={(e) => this.handleChange(e)}/>4</label>
       <label> <input type="radio" name="Rating" value="5"  onChange={(e) => this.handleChange(e)}/>5</label><br /><br />
        <span style={{ color: 'red' }}> {this.state.errors.Rating} </span></div>
        <textarea rows="4" cols="50" name="textarea" form="feedback" value={this.state.fields.textarea} onChange={(e) => this.handleChange(e)}>Leave Comments...</textarea><br /><br />
        <button type="submit">Submit</button>
    </form>
</div>
</>
     );
 }
}

export default ControlledComponent;