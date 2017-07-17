import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'

const propTypes = {

};

const defaultProps = {

};

export default class DateTimePick extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
     return (
        <Flatpickr data-enable-time
                   onChange={v => console.info(v)} />
      )
  }
}

DateTimePick.propTypes = propTypes;
DateTimePick.defaultProps = defaultProps;
