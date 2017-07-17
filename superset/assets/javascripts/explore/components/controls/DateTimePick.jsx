import 'flatpickr/dist/themes/airbnb.css'
import Flatpickr from 'react-flatpickr'
import { Component } from 'react'

const propTypes = {
  changeFilter: PropTypes.func,
  removeFilter: PropTypes.func,
};

const defaultProps = {
  changeFilter: () => {},
  removeFilter: () => {},
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

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
