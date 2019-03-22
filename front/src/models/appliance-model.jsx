export default class applianceModel {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  save = () => {
    console.log(this.name," enregistrée")
  }

  goUp = () => {
    console.log(this.name," is going up")
  }

  goDown = () => {
    console.log(this.name," is going down")
  }

  turnOn = () => {
    console.log(this.name," is on")
  }

  turnOff = () => {
    console.log(this.name," is off")
  }
}
