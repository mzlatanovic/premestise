import {
  GetAllKindergardens,
  NewMoveRequest,
  GetCities,
  GetKindergardensByCity
} from "../../Actions/NavActions/MoveRequestActions";

import React, { Component } from "react";
import { connect } from "react-redux";

class MoveRequestForm extends Component {
  state = {
    privacyMainFormCheckbox: false,
    guardianMainFormCheckbox: false,
    privacyMainFormErrorMessage: null,
    groupErrorMessage: null,
    cityErrorMessage: null,
    parentNameErrorMessage: null,
    emailErrorMessage: null,
    phoneErrorMessage: null,
    fromKindergardenErrorMessage: null,
    toKindergardenErrorMessage: null,
    isGroupValid: false,
    isParentNameValid: false,
    isEmailValid: false,
    isPhoneValid: false,
    isFromKindergardenValid: false,
    isToKindergardenValid: false,
    isPrivacyMainFormValid: false,
    isGuardianMainFormValid: false,
    validationErrorExists: false,
    ParentNameSurname: "",
    Email: "",
    PhoneNumber: "",
    ChildBirthDate: null,
    City: "Нови Сад",
    Group: null,
    MoveFromLocationId: null,
    MoveToLocationId1: null,
    MoveToLocationId2: null,
    MoveToLocationId3: null,
    ageGroups:[],

  };

  form = {
    ParentName: "",
    Email: "",
    PhoneNumber: "",
    City: null,
    Group: null,
    FromKindergardenId: null,
    ToKindergardenIds: [],
    ChildBirthDate: new Date(),
    ChildName: 'None'
  };

  handleSubmitData = event => {
    event.preventDefault();

    let toKindergardenIds = [];
    if (this.state.MoveToLocationId1)
      toKindergardenIds.push(this.state.MoveToLocationId1);
    if (this.state.MoveToLocationId2)
      toKindergardenIds.push(this.state.MoveToLocationId2);
    if (this.state.MoveToLocationId3)
      toKindergardenIds.push(this.state.MoveToLocationId3);
    
    this.form.ParentName =  this.state.ParentNameSurname;
    this.form.Email = this.state.Email;
    this.form.PhoneNumber =  this.state.PhoneNumber;
    this.form.City =  this.state.City;
    this.form.Group =  this.state.Group;
    this.form.FromKindergardenId =  this.state.MoveFromLocationId;
    this.form.ToKindergardenIds =  toKindergardenIds;
      
    this.setState({
      privacyMainFormErrorMessage: this.arePrivacyMainFormAndGuardianMainFormValid() ? null : "Obavezno prihvatiti politiku privatnosti!" ,
      groupErrorMessage: this.isGroupValid() ? null : "Obavezno odabrati grupu!",
      cityErrorMessage: this.isCityValid() ? null : "Obavezno odabrati grad relokacije!" ,
      parentNameErrorMessage: this.isParentNameValid() ? null : "Obavezno uneti ime roditelja!",
      emailErrorMessage: this.isEmailValid() ? null : "Proveriti format e-mail adrese!" ,
      phoneErrorMessage: this.isPhoneNumberValid() ? null : "Obavezno uneti kontakt telefon!",
      fromKindergardenErrorMessage: this.isFromKindergardenIdValid() ? null : "Obavezno mesto relokacije!" ,
      toKindergardenErrorMessage: this.areToKindergardenIdsValid() ? null : "Obavezno odabrati želju za premeštaj!", 
      validationErrorExists: this.validationErrorExists()},
        () => {
        if(!this.state.validationErrorExists) {
          this.props.newMoveRequest(this.form);
        }
     });
  };

  validationErrorExists = () => {
    return !(this.state.isPrivacyMainFormValid && this.state.isGuardianMainFormValid && this.state.isGroupValid && this.state.isParentNameValid && this.state.isEmailValid &&  this.state.isPhoneValid && this.state.isFromKindergardenValid && this.state.isToKindergardenValid)
  };

  arePrivacyMainFormAndGuardianMainFormValid = () => {
      return !(this.state.privacyMainFormCheckbox === false || this.state.guardianMainFormCheckbox === false);
  };

  isGroupValid = () => {
      return !(this.form.Group === null);
  };

  isParentNameValid = () => {
       return !(this.form.ParentName === "");
  };
  
  isEmailValid = () => {
      return !(this.form.Email === "");
  };

  isPhoneNumberValid = () => {
      return !(this.form.PhoneNumber === "");
  };

  isCityValid = () => {
      return !(this.form.City === null);
  };

  isFromKindergardenIdValid = () => {
      return !(this.form.FromKindergardenId === null);
  };
  
  areToKindergardenIdsValid = () => {
      return !(this.form.ToKindergardenIds.length === 0);
  };

  isGroupValid = () => {
      return !(this.form.Group === null);
  };

  handleParentNameChange = event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.setState({
        ParentNameSurname: event.target.value,
        parentNameErrorMessage: null,
        isParentNameValid: true
      });
    } else {
      this.setState({
        parentNameErrorMessage: "Obavezno uneti ime roditelja!",
        ParentNameSurname: "",
      });
    }
  };

  emailFormatValidation = (emailAddress) => {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mailRegex.test(emailAddress)) {
      this.setState({
        Email: emailAddress,
        emailErrorMessage: "Proveriti format e-mail adrese!"
      });
      this.setState({});
    } else {
      this.setState({
        emailErrorMessage: null,
        Email: emailAddress,
        isEmailValid: true
      });

    }
  }

  handleEmailChange = event => {
    event.preventDefault();

    if (event.target.value !== "") {
      this.emailFormatValidation(event.target.value)
    } else {
      this.setState({
        Email: "",
        emailErrorMessage: "Proveriti format e-mail adrese!"
        
      });
    }
  };

  handlePhoneNumberChange = event => {
    event.preventDefault();
    if (event.target.value !== "") {
      this.setState({
        PhoneNumber: event.target.value,
        phoneErrorMessage: null,
        isPhoneValid: true
      });
    } else {
      this.setState({
        PhoneNumber: "",
        phoneErrorMessage: "Obavezno uneti kontakt telefon!"
      });
    }
  };

  handlePrivacyMainFormChange = event => {
      this.setState({
        privacyMainFormCheckbox: event.target.checked,
        privacyMainFormErrorMessage: event.target.checked ? null : "Obavezno prihvatiti politiku privatnosti!",
        isPrivacyMainFormValid: event.target.checked ? true : false
      });
  };

  handleGuardianMainFormChange = event => {
      this.setState({
        guardianMainFormCheckbox: event.target.checked,
        privacyMainFormErrorMessage: event.target.checked ? null : "Obavezno prihvatiti politiku privatnosti!",
        isGuardianMainFormValid: event.target.checked ? true : false
      });
  };

  handleCityChange = event => {
    event.preventDefault();

    if (event.target.value !== null) {
      this.setState({
        City: event.target.value,
        cityErrorMessage: null
      });
      this.props.getKindergardensByCity(event.target.value)
    } else {
      this.setState({ City: null });
    }
  };

  handleGroupChange = event => {
    event.preventDefault();

    if (event.target.value !== null) {
      this.setState({
        Group: event.target.value,
        groupErrorMessage: null,
        isGroupValid: true
      });
    } else {
      this.setState({ Group: null });
    }
  };


  handleMoveFromLocationIdChange = event => {
    event.preventDefault();
    if (event.target.value !== null) {
      this.setState({
        MoveFromLocationId: event.target.value,
        fromKindergardenErrorMessage: null,
        isFromKindergardenValid: true
      });

    } else {
      this.setState({
        MoveFromLocationId: null,
        fromKindergardenErrorMessage: "Obavezno mesto relokacije!"
        
      });
    }
  };

  handleMoveToLocationId1Change = event => {
    event.preventDefault();
    //check format before setting state or smth
    if (event.target.value !== null) {
      this.setState({
        MoveToLocationId1: event.target.value,
        toKindergardenErrorMessage: null,
        isToKindergardenValid: true 
      });

    } else {
      this.setState({ MoveToLocationId1: null });
    }
  };

  handleMoveToLocationId2Change = event => {
    event.preventDefault();

    if (event.target.value !== null) {
      this.setState({
        MoveToLocationId2: event.target.value,
        toKindergardenErrorMessage: null,
        isToKindergardenValid: true 
      });
    } else {
      this.setState({ MoveToLocationId2: null });
    }
  };

  handleMoveToLocationId3Change = event => {
    event.preventDefault();

    if (event.target.value !== null) {
      this.setState({
        MoveToLocationId3: event.target.value,
        toKindergardenErrorMessage: null,
        isToKindergardenValid: true
      });
    } else {
      this.setState({ MoveToLocationId3: null });
    }
  };

  componentDidMount() {
    this.generateAgeGroups()
    this.props.getKindergardensByCity("Нови Сад")
    if (this.props.prePopulatedId != null) {
      this.setState({ toKindergardenErrorMessage: null});
      this.state.MoveToLocationId1 = this.props.prePopulatedId;
    }
  }

  generateAgeGroups() {
    let currentYear = new Date().getFullYear()
    let groups = [
      {
        id: 1,
        text: 'Rođeni 01.03.'+(currentYear-1)+'-28.02.'+(currentYear)+' Bebe grupa'
      },
      {
        id: 2,
        text: 'Rođeni 01.03.'+(currentYear-2)+'-28.02.'+(currentYear-1)+' Mlađa jaslena grupa'
      },
      {
        id: 3,
        text: 'Rođeni 01.03.'+(currentYear-3)+'-28.02.'+(currentYear-2)+' Starija jaslena grupa'
      },
      {
        id: 4,
        text: 'Rođeni 01.03.'+(currentYear-4)+'-28.02.'+(currentYear-3)+' Mlađa grupa'
      },
      {
        id: 5,
        text: 'Rođeni 01.03.'+(currentYear-5)+'-28.02.'+(currentYear-4)+' Srednja grupa'
      },
      {
        id: 6,
        text: 'Rođeni 01.03.'+(currentYear-6)+'-28.02.'+(currentYear-5)+' Starija grupa'
      },
      {
        id: 7,
        text: 'Rođeni 01.03.'+(currentYear-7)+'-28.02.'+(currentYear-6)+' Predškolska grupa'
      }
    ]
    this.setState({
      ageGroups: groups
    })

  }

  render() {
    const {
      ParentNameSurname,
      Email,
      PhoneNumber,
      ChildBirthDate,
      City,
      Group,
      MoveFromLocationId,
      MoveToLocationId1,
      MoveToLocationId2,
      MoveToLocationId3
    } = this.state;
    const fromKindergardenId = this.props.fromKindergardenId;

    const whereToMove = "Gde želiš da se premestiš?"
    const parentNamePlaceholderText = "Ime i prezime roditelja *";
    const emailPlaceholderText = "Email *";
    const phonePlaceholderText = "Broj telefona *";
    const birthdatePlaceholderText = "Datum rođenja deteta";
    const cityPlaceholderText = "Grad *";
    const groupPlaceholderText = "Odabrati grupu *";
    const locationToFirstWishText = "Lokacija na koju želiš da se premestiš? *";
    const locationToSecondWishText = "2. Lokacija na koju želiš da se premestiš? (";
    const locationToThirdWishText = "3. Lokacija na koju želiš da se premestiš?";
    const chooseCurrentLocationText = "Izaberi trenutnu lokaciju *";
    const messengerLinkText = "Pišite nam";
    const facebookLinkText = "Posetite nas";
    const submitFormButtonText = "Obavesti me"

    return (
      <div id="tab-1" className="tab-content current">
      <h2 className="tab-title">{whereToMove}</h2>
        <form>
          <div className="form-wrap">
            <div className="form-left">
              <input
                type="text"
                id="newRequestParentName"
                className="input parent-input"
                placeholder={parentNamePlaceholderText}
                onChange={this.handleParentNameChange}
                value={ParentNameSurname}
              />
              <span className="errorMessageMainForm" >
                {this.state.parentNameErrorMessage}
              </span>

              <input
                type="email"
                id="newRequestEmail"
                className="input input__email"
                placeholder={emailPlaceholderText}
                onChange={this.handleEmailChange}
                value={Email}
              />
              <span className="errorMessageMainForm blockSpan">
                {this.state.emailErrorMessage}
              </span>
              <div className="form-left__double">
                <div className="inputSpanGlobalWrapper">
                  <div className="inputSpanWrapperPhone">
                    <input
                      type="text"
                      id="newRequestPhoneNumber"
                      className="input input__phone"
                      placeholder={phonePlaceholderText}
                      onChange={this.handlePhoneNumberChange}
                      value={PhoneNumber}
                    />

                    <span className="errorMessageMainForm" >
                      {this.state.phoneErrorMessage}
                    </span>
                  </div>


                </div>
              </div>


                {/* <select
                  id="city"
                  onChange={this.handleCityChange}
                  value={City}
                >
                  <option value="" selected  hidden>
                    {cityPlaceholderText}
                  </option>
                  {this.props.cities.map(city => (
                    <option value={city}>{city}</option>
                  ))}
                </select>
                <span className="errorMessageMainForm" >
                  {this.state.cityErrorMessage}
                </span> */}
             

              <br />
            </div>

            <div className="form-right">





              <div className="select-wrap">
                <select
                  id="newRequestFromKindergardenSelect"
                  onChange={this.handleMoveFromLocationIdChange}
                  value={MoveFromLocationId}
                >
                  <option value="" selected  hidden>
                    {chooseCurrentLocationText}
                  </option>
                  {this.props.allKindergardens.map(kinder => (
                    <option value={kinder.id}>{kinder.name}</option>
                  ))}
                </select>
                <span className="errorMessageMainForm" >
                  {this.state.fromKindergardenErrorMessage}
                </span>
              </div>
              <div className="select-wrap">
                <select
                  id="newRequestToKindergarden1Select"
                  onChange={this.handleMoveToLocationId1Change}
                  value={
                    this.props.prePopulatedId !== null
                      ? this.props.prePopulatedId
                      : MoveToLocationId1
                  }
                >
                  <option value="" selected  hidden>
                    {locationToFirstWishText}
                  </option>
                  {this.props.allKindergardens.map(kinder => (
                    <option value={kinder.id}>{kinder.name}</option>
                  ))}
                </select>
                <span className="errorMessageMainForm" >
                  {this.state.toKindergardenErrorMessage}
                </span>
              </div>
              <select
                  id="group"
                  onChange={this.handleGroupChange}
                  value={Group}
                >
                  <option value="" selected  hidden>
                    {groupPlaceholderText}
                  </option>
                  {this.state.ageGroups.map(group => (
                    <option value={group.id}>{group.text}</option>
                  ))}
                </select>
                <span className="errorMessageMainForm" >
                  {this.state.groupErrorMessage}
                </span>
                <div className="mainPrivacyPolicyCheckBox">
                  <div style={ { display: 'flex', flexDirection: 'column'}} className="inline_block">
                    <label for="privacy" className="checkbox-label">
                      <input type="checkbox" name="privacy" className="checkBoxMiddleAlign" checked={this.state.privacyMainFormCheckbox} onClick={this.handlePrivacyMainFormChange}/>
                        &nbsp;&nbsp;&nbsp;Pročitao/la sam i prihvatam Opšte uslove povezivanja roditelja uz pomoć veb-sajta „Premesti.se“ i Obaveštenje o obradi podataka o ličnosti
                    </label>
                    <label for="guardian" className="checkbox-label">
                      <input type="checkbox" name="guardian" className="checkBoxMiddleAlign" checked={this.state.guardianMainFormCheckbox} onClick={this.handleGuardianMainFormChange}/>
                      &nbsp;&nbsp;&nbsp;Potvrđujem da sam roditelj/staratelj deteta za koje se traži premeštanje
                    </label>
                  </div>
                  <div>
                    <span className="errorMessageMainForm " >
                      {this.state.privacyMainFormErrorMessage}
                    </span>
                  </div>
                </div>
            </div>
          </div>

          <div className="form-buttons">
            <div className="form-buttons__left">
              <ul className="form-social-links">

              </ul>
            </div>

            <div className="form-buttons__right">
              <button
                className="btn"
                type="submit"
                id="submit-new-request"
                onClick={this.handleSubmitData}>
                <span className="font-ico-envelope"></span> {submitFormButtonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.currentNavTab,
    allKindergardens: state.kindergardens,
    fromKindergardenId: state.fromKindergardenId,
    prePopulatedId: state.prePopulatedId,
    cities: state.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getKindergardensByCity: (city) => {
      dispatch(GetKindergardensByCity(city))
    },
    getAllKindergardens: () => {
      dispatch(GetAllKindergardens());
    },
    getCities: () => {
      dispatch(GetCities());
    },
    newMoveRequest: formRequest => {
      dispatch(NewMoveRequest(formRequest));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveRequestForm);
