import { VerifyEmail } from "../../Actions/EmailActions/EmailActions";
import InfoPage from "../Info/InfoPage";

import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "querystring";

class EmailVerification extends Component {
  componentDidMount() {
    const queryId = queryString.parse(window.location.search)["?id"];
    this.props.verifyEmail(queryId);
  }

  render() {
    const emailVerified = this.props.emailVerified;
    const successMessage = "Vas zahtev je usao u sistem, obavesticemo Vas cim se dogodi poklapanje.";
    const waitingMessage = "Verifikacija u toku";

    return (
      <div className="wrap">
        {
          <InfoPage
            description={
              emailVerified
                ? successMessage
                : waitingMessage
            }
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    emailVerified: state.emailVerification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyEmail: id => {
      dispatch(VerifyEmail(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);