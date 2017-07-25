import React from 'react';
import PropTypes from 'prop-types';
import { Label, Row, Col, FormControl, Modal } from 'react-bootstrap';
import Select, { Creatable } from 'react-select';
import ControlHeader from '../ControlHeader';
import MetricCheck from '../../../components/MetricCheck';

const propTypes = {
  metrics:PropTypes.array,
  valueKey: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

const defaultProps = {
  onChange: () => {},
  value: [],
};

export default class MetricControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      filter: '',
      options:this.props.value,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }
  onChange(vizType) {
    this.props.onChange(vizType);
   // this.setState({ showModal: false });
  }
  ChangeCheck(name,value){
    if(name.length>0){
         if(value){
             if(this.props.value.indexOf(name)==-1)this.onChange(this.props.value.concat([name]))
         }else{
            this.onChange(this.props.value.filter(x => x !==name ));
         }

    }
   // this.setState({ options:this.props.value});
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  changeSearch(event) {
    this.setState({ filter: event.target.value });
  }
  renderMetric(Metric) {
      let isck=false;
      for(let i in this.props.value){
          if(this.props.value[i]==Metric[this.props.valueKey])
          {
              isck=true
              break;
          }
      }
    return (
        <MetricCheck
            metric={Metric}
            isck={isck}
            value_name={this.props.valueKey}
            onChange={this.ChangeCheck.bind(this,Metric[this.props.valueKey])}
        />
    )
  }

   getOptions(value){
       var options =[]
       value.map(x=>options.push({"value":x,"lable":x}))
       return options
   }
   arrowRenderer (){
        return (
            <span type="hidden"></span>
        );
    }
  render() {
    const filter = this.state.filter;
    const filteredVizTypes = this.props.metrics
      .filter(vt => filter.length === 0 || vt[this.props.valueKey].toLowerCase().includes(filter));
    const imgPerRow = 4;
    const rows = [];
    for (let i = 0; i <= filteredVizTypes.length; i += imgPerRow) {
      rows.push(
        <Row key={`row-${i}`}>
          {filteredVizTypes.slice(i, i + imgPerRow).map(vt => (
            <Col md={3} key={`grid-col-${vt[this.props.valueKey]}`}>
              {this.renderMetric(vt)}
            </Col>
          ))}
        </Row>);
    }

    const selectwarp={
        lable:"已选择",
        multi: true,
        freeForm: false,
        autosize: true,
        clearable: true,
        isLoading: false,
        onChange:this.onChange.bind(this),
        options: this.getOptions(this.props.value),
        value: this.props.value,
        placeholder:'已选择' ,
        arrowRenderer:this.arrowRenderer,
    }
    return (
      <div>
        <ControlHeader
          {...this.props}
          rightNode={
            <a onClick={this.toggleModal}>编辑</a>
          }
        />
        {/*<Label onClick={this.toggleModal} style={{ cursor: 'pointer' }}>*/}
          {/*{visTypes[this.props.value].label}*/}
        {/*</Label>*/}
        <Modal show={this.state.showModal} onHide={this.toggleModal} bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>选择需要的内容</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row space-1">
                  <div className="col-lg-9">
                    <div>
                         <FormControl
                            id="formControlsText"
                            type="text"
                            bsSize="sm"
                            value={this.state.filter}
                            placeholder="过滤"
                            onChange={this.changeSearch}
                          />
                    </div>
                    {rows}
                  </div>
                  <div className="col-lg-3">
                      <Select
                          {...selectwarp}
                      />
                  </div>
              </div>
          </Modal.Body>
        </Modal>
      </div>);
  }
}

MetricControl.propTypes = propTypes;
MetricControl.defaultProps = defaultProps;
