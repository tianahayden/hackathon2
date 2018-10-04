import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Chart } from "react-google-charts"

class NutritionInfo extends Component {
  render() {
    var food0name = this.props.inputs[0].name.charAt(0).toUpperCase() + this.props.inputs[0].name.slice(1)
    var food1name = this.props.inputs[1].name.charAt(0).toUpperCase() + this.props.inputs[1].name.slice(1)
    const pieOptions = {
      title: "",
      pieHole: 0.6,
      slices: [
        { color: "#2BB673" },
        { color: "#d91e48" },
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14
        }
      },
      chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
      },
      fontName: "Roboto"
    };

    return (
      <div>
        <div>
          <h1>{food0name} Nutrition Info</h1>
          <p> Calories: {this.props.inputs[0].calories} </p>
          <p> Serving Size: {this.props.inputs[0].servingSize} </p>
          <p> Serving Unit: {this.props.inputs[0].servingUnit} </p>
          <img src={'https://source.unsplash.com/600x500/?' + this.props.inputs[0].name} />
          <div>
            <br></br>
            <Chart
              chartType="PieChart"
              data={[["Food", "Overall Calories"], [this.props.inputs[0].name, this.props.inputs[0].calories], ["Remaining Calories *", 2500 - this.props.inputs[0].calories]]}
              width={"100%"}
              height={"400px"}
              options={pieOptions}
            />
            * Based on 2,500 Daily Calories
          </div>
        </div>
        <div>
          <h1>{food1name} Nutrition Info</h1>
          <p> Calories: {this.props.inputs[1].calories} </p>
          <p> Serving Size: {this.props.inputs[1].servingSize} </p>
          <p> Serving Unit: {this.props.inputs[1].servingUnit} </p>
          <img src={'https://source.unsplash.com/600x500/?' + this.props.inputs[1].name} />
          <div>
            <br></br>
            <Chart
              chartType="PieChart"
              data={[["Food", "Overall Calories"], [this.props.inputs[1].name, this.props.inputs[1].calories], ["Remaining Calories *", 2500 - this.props.inputs[0].calories]]}
              width={"100%"}
              height={"400px"}
              options={pieOptions}
            />
            * Based on 2,500 Daily Calories
          </div>
        </div>
      </div>
    )
  }
}

class Result extends Component {

  renderResult() {
    var food1cal = parseFloat(this.props.inputs[0].calories);
    var food2cal = parseFloat(this.props.inputs[1].calories);
    var higher = Math.max(food1cal, food2cal)
    var lower = Math.min(food1cal, food2cal)
    var result = Math.floor(higher / lower)

    // checking which food is higher then matching with result from above
    if (this.props.inputs[0].calories > this.props.inputs[1].calories) {
      //first one is plural
      if ((result * this.props.inputs[1].servingSize) > 1) {
        return (
          <div>
            <p>
              You can eat {result * this.props.inputs[1].servingSize} {this.props.inputs[1].servingUnit} of {this.props.inputs[1].name}s per every {this.props.inputs[0].servingSize} {this.props.inputs[0].servingUnit} of {this.props.inputs[0].name}
            </p>
            <NutritionInfo
              inputs={this.props.inputs} />
          </div>
        )
      }
      else {
        return (
          <div>
            <p>
              You can eat {result * this.props.inputs[1].servingSize} {this.props.inputs[1].servingUnit} of {this.props.inputs[1].name} per every {this.props.inputs[0].servingSize} {this.props.inputs[0].servingUnit} of {this.props.inputs[0].name}
            </p>
            <NutritionInfo
              inputs={this.props.inputs} />
          </div>
        )
      }
    }

    if (this.props.inputs[1].calories > this.props.inputs[0].calories) {
      //first one is plural
      if ((result * this.props.inputs[0].servingSize) > 1) {
        return (
          <div>
            <p>
              You can eat {result * this.props.inputs[0].servingSize} {this.props.inputs[0].servingUnit} of {this.props.inputs[0].name}s per every {this.props.inputs[1].servingSize} {this.props.inputs[1].servingUnit} of {this.props.inputs[1].name}
            </p>
            <NutritionInfo
              inputs={this.props.inputs} />
          </div>
        )
      }
      else {
        return (
          <div>
            <p>
              You can eat {result * this.props.inputs[0].servingSize} {this.props.inputs[0].servingUnit} of {this.props.inputs[0].name} per every {this.props.inputs[1].servingSize} {this.props.inputs[1].servingUnit} of {this.props.inputs[1].name}
            </p>
            <NutritionInfo
              inputs={this.props.inputs} />
          </div>
        )
      }
    }
  }


  render() {
    return (
      <div>
        {this.props.toggleResult === true ? this.renderResult() : null}
      </div>
    )
  }
}


class InputOptions extends Component {

  render() {
    return (
      this.props.inputs.map((e, i) => {
        return (
          <div key={i}>
            <label>{e.label} </label>
            <input name={e.label} placeholder={e.label} onChange={this.props.handleInputChange} />
          </div>
        )
      })
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [
        { label: 'Food 1', },
        { label: 'Food 2', },
      ],
      toggleResult: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleInputChange(e) {
    var copyInputs = this.state.inputs.slice()
    var index = copyInputs.findIndex(obj => obj.label.includes(e.target.name))
    var updatedInput = {
      label: e.target.name,
      name: e.target.value,
    }
    copyInputs.splice(index, 1, updatedInput)

    this.setState({
      inputs: copyInputs,
    })
  }


  handleClick() {
    axios({
      method: 'get',
      url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + this.state.inputs[0].name + '?fields=nf_calories%2Cnf_serving_size_qty%2Cnf_serving_size_unit',
      headers: { 'X-Mashape-Key': process.env.REACT_APP_KEY },
    })
      .then(response => {
        var dataCalories = response.data.hits[0].fields.nf_calories
        var dataServingSize = response.data.hits[0].fields.nf_serving_size_qty
        var dataServingUnit = response.data.hits[0].fields.nf_serving_size_unit
        var copyInputs = this.state.inputs.slice()
        var updatedInput = {
          label: copyInputs[0].label,
          name: copyInputs[0].name,
          calories: dataCalories,
          servingSize: dataServingSize,
          servingUnit: dataServingUnit,
        }
        copyInputs.splice(0, 1, updatedInput)

        this.setState({
          inputs: copyInputs,
        })
      }
      );

    axios({
      method: 'get',
      url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + this.state.inputs[1].name + '?fields=nf_calories%2Cnf_serving_size_qty%2Cnf_serving_size_unit',
      headers: { 'X-Mashape-Key': 'WKq2QQHxgymsh6gCFbBhuUSEqA8Rp1Abq9XjsnbkTTjFDcnsWu' },
    })
      .then(response => {
        var dataCalories = response.data.hits[0].fields.nf_calories
        var dataServingSize = response.data.hits[0].fields.nf_serving_size_qty
        var dataServingUnit = response.data.hits[0].fields.nf_serving_size_unit
        var copyInputs = this.state.inputs.slice()
        var updatedInput = {
          label: copyInputs[1].label,
          name: copyInputs[1].name,
          calories: dataCalories,
          servingSize: dataServingSize,
          servingUnit: dataServingUnit,
        }
        copyInputs.splice(1, 1, updatedInput)

        this.setState({
          inputs: copyInputs,
        })
      }
      );

    this.setState({
      toggleResult: true
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Food Faceoff</h1>
        </header>
        <p>
          Compare how much of one food you can eat versus another
          </p>
        <InputOptions
          inputs={this.state.inputs}
          handleInputChange={this.handleInputChange}
        />
        <button onClick={this.handleClick}>Submit</button>
        <Result
          inputs={this.state.inputs}
          toggleResult={this.state.toggleResult}
        />
      </div>
    );
  }
}

export default App;
