<<<<<<< HEAD
class AMToolsGuides {
    constructor() {
        this.calculator();
        this.loadElements();
        this.organizeElements();
        this.prototype();
        this.visual();
    }
    get windowWidth() {
        return window.innerWidth
    }
    get windowHeight() {
        return window.innerHeight
    }
    get viewportW() {
        return Math.max(document.documentElement.clientWidth, this._windowWidth || 0);
    }
    get viewportH() {
        return Math.max(document.documentElement.clientHeight, this._windowHeight || 0);
    }
    calculator() {
        this.seats = (_demandY, _demandJ, _demandF, _totalSeats, _flightRange, _airSpeed) => {

            let result = {};
            if (_demandY != null || _demandY != undefined) {

                let _totalDemand = _demandY + _demandJ + _demandF;

                result = {
                    seatsY: Math.round((_demandY / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + 2 * _demandJ / _totalDemand * _totalSeats + 3 * _demandY / _totalDemand * _totalSeats))),
                    seatsJ: Math.round((_demandJ / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + 2 * _demandJ / _totalDemand * _totalSeats + 3 * _demandY / _totalDemand * _totalSeats))),
                    seatsF: Math.round((_demandF / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + _demandJ / _totalDemand * _totalSeats * 2 + _demandY / _totalDemand * _totalSeats * 3)))
                };
            } else {
                let _tripsPerDay = this.tripsPerDay(_flightRange, _airSpeed);
                _tripsPerDay.realismTripsPerDay = Math.round(_tripsPerDay.realismTripsPerDay);
                _tripsPerDay.easyTripsPerDay = Math.round(_tripsPerDay.easyTripsPerDay);

                let restTS = _totalSeats;

                let calc = {
                    seatsF(_tpd) {
                        let result = Math.round(_demandF / _tpd);
                        let valid = _totalSeats - (result * 3);
                        if (valid < 0) { result = _totalSeats / 3 } { _totalSeats -= result * 3 };
                        return Math.round(result);
                    },
                    seatsJ(_tpd) {
                        let result = Math.round(_demandJ / _tpd);
                        let valid = _totalSeats - (result * 2);
                        if (valid < 0) { result = _totalSeats / 2 } { _totalSeats -= result * 2 };
                        return Math.round(result);
                    },
                    seatsY(_tpd) {
                        let result = (_totalSeats < 0) ? 0 : _totalSeats;
                        _totalSeats = restTS;
                        return result;
                    }
                };
                result = {
                    reaslimSeatsF: calc.seatsF(_tripsPerDay.realismTripsPerDay),
                    reaslimSeatsJ: calc.seatsJ(_tripsPerDay.realismTripsPerDay),
                    reaslimSeatsY: calc.seatsY(_tripsPerDay.realismTripsPerDay),
                    reaslimTripsPerDay: _tripsPerDay.realismTripsPerDay,
                    easySeatsF: calc.seatsF(_tripsPerDay.easyTripsPerDay),
                    easySeatsJ: calc.seatsJ(_tripsPerDay.easyTripsPerDay),
                    easySeatsY: calc.seatsY(_tripsPerDay.easyTripsPerDay),
                    easyTripsPerDay: _tripsPerDay.easyTripsPerDay
                };
            }

            return result;
        };

        this.profit = (_seatsY, _seatsJ, _seatsF, _flightRange, _airSpeed, _fuelConsumption, _co2Consumption, _reputPercentage) => {

            let _ticket = this.ticket(_flightRange);
            let _tripsPerDay = this.tripsPerDay(_flightRange, _airSpeed);
            let _paxFlight = this.paxFlight(_seatsY, _seatsJ, _seatsF);
            let _co2CostFlight = this.co2CostFlight(_co2Consumption, _flightRange, _reputPercentage, _paxFlight);
            let _fuelCostFlight = this.fuelCostFlight(_fuelConsumption, _flightRange);

            let _result = {
                realismProfitFlight: Math.round(((((_seatsY * _ticket.realismPriceY) + (_seatsJ * _ticket.realismPriceJ) + (_seatsF * _ticket.realismPriceF)) * (_reputPercentage / 100) - _fuelCostFlight - _co2CostFlight) / 1.2)),
                realismProfitDay: 0,
                easyProfitFlight: Math.round(((((_seatsY * _ticket.easyPriceY) + (_seatsJ * _ticket.easyPriceJ) + (_seatsF * _ticket.easyPriceF)) * (_reputPercentage / 100) - _fuelCostFlight - _co2CostFlight) / 1.2)),
                easyProfitDay: 0
            };

            _result.realismProfitDay = Math.round(_result.realismProfitFlight * _tripsPerDay.realismTripsPerDay);
            _result.easyProfitDay = Math.round(_result.easyProfitFlight * _tripsPerDay.easyTripsPerDay);

            return _result;
        };

        this.ticket = (_flightRange) => {
            let roundMath = (_price) => {
                return (_price % 10 != 0 ? _price - (_price % 10) : _price);
            };

            let _result = {
                realismPriceY: roundMath((Math.floor((((0.3 * _flightRange) + 150) * 1.10)) / 10) * 10),
                realismPriceJ: roundMath((Math.floor((((0.6 * _flightRange) + 500) * 1.08)) / 10) * 10),
                realismPriceF: roundMath((Math.floor((((0.9 * _flightRange) + 1000) * 1.06)) / 10) * 10),
                easyPriceY: roundMath((Math.floor((((0.4 * _flightRange) + 170) * 1.10)) / 10) * 10),
                easyPriceJ: roundMath((Math.floor((((0.8 * _flightRange) + 560) * 1.08)) / 10) * 10),
                easyPriceF: roundMath((Math.floor((((1.2 * _flightRange) + 1200) * 1.06)) / 10) * 10)
            }

            return _result;
        };
        this.tripsPerDay = (_flightRange, _airSpeed) => {

            let _result = {
                realismTripsPerDay: Math.abs(24 / (_flightRange / _airSpeed)),
                easyTripsPerDay: Math.abs(24 / (_flightRange / (_airSpeed * 1.5)))
            };
            return _result;
        };
        this.paxFlight = (_seatsY, _seatsJ, _seatsF) => {
            return Math.round((+_seatsY + +_seatsJ + +_seatsF))
        }
        this.fuelCostFlight = (_fuelConsumption, _flightRange) => {
            return Math.round((_fuelConsumption * _flightRange * 0.85));
        };
        this.co2CostFlight = (_co2Consumption, _flightRange, _reputPercentage, _paxFlight) => {
            return Math.round(_co2Consumption * _paxFlight * _flightRange * 0.14 * (_reputPercentage / 100));
        };

        this.averageTime = (_distance, _speed) => {
            return (_distance / _speed);
        };
    }
    organizeElements() {
        this.centralize = (element) => {
            switch (element.style.position) {
                case 'absolute':
                    element.style.top = ((this.viewportH - element.offsetHeight) / 2) + 'px';
                    element.style.left = ((this.viewportW - element.offsetWidth) / 2) + 'px';
                    break;
                default:
                    element.style.marginTop = ((this.viewportH - element.offsetHeight) / 2) + 'px';
                    element.style.marginLeft = ((this.viewportW - element.offsetWidth) / 2) + 'px';
            }
            return element
        };
    }
    loadElements() {
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.toCamelCase(element.id)] = element;
        });
    }
    prototype() {
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach((event) => {
                this.addEventListener(event, fn, false);
            });
            return this;
        };
        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        };
        Element.prototype.toggle = function() {
            this.style.display = (this.style.display == 'none') ? 'block' : 'none';
            return this;
        }
        Element.prototype.modeForm = function(form, page) {
            if (this.classList.contains('active')) return;
            switch (page) {
                case 'seats-page':
                    let _inputSP = form.querySelectorAll('input[name]');

                    if (this.classList.contains('btn-seats-new-mode')) {
                        [..._inputSP].forEach((input) => {
                            if (['input-demand-y', 'input-flight-range', 'input-air-speed'].includes(input.name)) {
                                input.style.display = (input.style.display == 'none') ? 'block' : 'none';
                            }
                            input.value = null;
                        });
                        this.classList.add('active');
                        this.parentElement.querySelector('.btn-seats-normal-mode').classList.remove('active');
                    } else if (this.classList.contains('btn-seats-normal-mode')) {
                        [..._inputSP].forEach((input) => {
                            if (['input-demand-y', 'input-flight-range', 'input-air-speed'].includes(input.name)) {
                                input.style.display = (input.style.display == 'none') ? 'block' : 'none';
                            }
                            input.value = null;
                        });
                        this.classList.add('active');
                        this.parentElement.querySelector('.btn-seats-new-mode').classList.remove('active');
                    }
                    break;
                case 'ticket-page':
                    let _inputTP = form.querySelectorAll('input[name]');

                    if (this.classList.contains('btn-simple-mode')) {
                        [..._inputTP].forEach((input) => {
                            if (['input-departure', 'input-arrival', 'input-flight-range'].includes(input.name)) {
                                input.style.display = (input.style.display == 'none') ? 'block' : 'none';
                            }
                            input.value = null;
                        });
                        this.classList.add('active');
                        this.parentElement.querySelector('.btn-find-mode').classList.remove('active');
                    } else if (this.classList.contains('btn-find-mode')) {
                        [..._inputTP].forEach((input) => {
                            if (['input-departure', 'input-arrival', 'input-flight-range'].includes(input.name)) {
                                input.style.display = (input.style.display == 'none') ? 'block' : 'none';
                            }
                            input.value = null;
                        });
                        this.classList.add('active');
                        this.parentElement.querySelector('.btn-simple-mode').classList.remove('active');
                    }
                    break;
            }
        };
    }
    visual() {
        this._propertiesAnimatios = {};

        this.setPropertiesAnimations = () => {
            this._propertiesAnimatios[this.el.backover.id] = {
                me: this.el.backover,
                domOpen: [],
                closeType: ['mouseenter']
            };
        };
        window.toggleOver = (ref, mode) => {

            let obj = this.el.backover;

            ref = (ref === null || ref === undefined) ? this._propertiesAnimatios[obj.id].domOpen : ref;
            this._propertiesAnimatios[obj.id].domOpen = (this._propertiesAnimatios[obj.id].domOpen != ref) ? ref : [];
            this._propertiesAnimatios[obj.id].closeType = (mode === null || mode === undefined) ? [] : mode;

            obj.toggleClass('show');
            if (ref === null && ref === undefined) return;
            [...ref].forEach((element) => {
                element.toggleClass('show');
            });
        };
        this.setPropertiesAnimations();
    }
=======
class AMToolsGuides {
    constructor() {
        this.calculator();
        this.loadElements();
        this.organizeElements();
        this.prototype();
        this.visual();
    }
    get windowWidth() {
        return window.innerWidth
    }
    get windowHeight() {
        return window.innerHeight
    }
    get viewportW() {
        return Math.max(document.documentElement.clientWidth, this._windowWidth || 0);
    }
    get viewportH() {
        return Math.max(document.documentElement.clientHeight, this._windowHeight || 0);
    }
    calculator() {
        this.seats = (_demandJ, _demandF, _totalSeats, _flightRange, _airSpeed) => {

            let _tripsPerDay = this.tripsPerDay(_flightRange, _airSpeed);
            _tripsPerDay.realismTripsPerDay = Math.round(_tripsPerDay.realismTripsPerDay);
            _tripsPerDay.easyTripsPerDay = Math.round(_tripsPerDay.easyTripsPerDay);

            let restTS = _totalSeats;

            let calc = {
                seatsF(_tpd) {
                    let result = Math.round(_demandF / _tpd);
                    let valid = _totalSeats - (result * 3);
                    if (valid < 0) { result = _totalSeats / 3 } { _totalSeats -= result * 3 };
                    return Math.round(result);
                },
                seatsJ(_tpd) {
                    let result = Math.round(_demandJ / _tpd);
                    let valid = _totalSeats - (result * 2);
                    if (valid < 0) { result = _totalSeats / 2 } { _totalSeats -= result * 2 };
                    return Math.round(result);
                },
                seatsY(_tpd) {
                    let result = (_totalSeats < 0) ? 0 : _totalSeats;
                    _totalSeats = restTS;
                    return result;
                }
            };
            let result = {
                reaslimSeatsF: calc.seatsF(_tripsPerDay.realismTripsPerDay),
                reaslimSeatsJ: calc.seatsJ(_tripsPerDay.realismTripsPerDay),
                reaslimSeatsY: calc.seatsY(_tripsPerDay.realismTripsPerDay),
                reaslimTripsPerDay: _tripsPerDay.realismTripsPerDay,
                easySeatsF: calc.seatsF(_tripsPerDay.easyTripsPerDay),
                easySeatsJ: calc.seatsJ(_tripsPerDay.easyTripsPerDay),
                easySeatsY: calc.seatsY(_tripsPerDay.easyTripsPerDay),
                easyTripsPerDay: _tripsPerDay.easyTripsPerDay
            };

            // let _totalDemand = _demandY + _demandJ + _demandF;

            // let _result = {
            //     seatsY: Math.round((_demandY / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + 2 * _demandJ / _totalDemand * _totalSeats + 3 * _demandY / _totalDemand * _totalSeats))),
            //     seatsJ: Math.round((_demandJ / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + 2 * _demandJ / _totalDemand * _totalSeats + 3 * _demandY / _totalDemand * _totalSeats))),
            //     seatsF: Math.round((_demandF / _totalDemand * _totalSeats) * (_totalSeats / (_demandF / _totalDemand * _totalSeats + _demandJ / _totalDemand * _totalSeats * 2 + _demandY / _totalDemand * _totalSeats * 3)))
            // }
            return result;
        };

        this.profit = (_seatsY, _seatsJ, _seatsF, _flightRange, _airSpeed, _fuelConsumption, _co2Consumption, _reputPercentage) => {

            let _ticket = this.ticket(_flightRange);
            let _tripsPerDay = this.tripsPerDay(_flightRange, _airSpeed);
            let _paxFlight = this.paxFlight(_seatsY, _seatsJ, _seatsF);
            let _co2CostFlight = this.co2CostFlight(_co2Consumption, _flightRange, _reputPercentage, _paxFlight);
            let _fuelCostFlight = this.fuelCostFlight(_fuelConsumption, _flightRange);

            let _result = {
                realismProfitFlight: Math.round(((((_seatsY * _ticket.realismPriceY) + (_seatsJ * _ticket.realismPriceJ) + (_seatsF * _ticket.realismPriceF)) * (_reputPercentage / 100) - _fuelCostFlight - _co2CostFlight) / 1.2)),
                realismProfitDay: 0,
                easyProfitFlight: Math.round(((((_seatsY * _ticket.easyPriceY) + (_seatsJ * _ticket.easyPriceJ) + (_seatsF * _ticket.easyPriceF)) * (_reputPercentage / 100) - _fuelCostFlight - _co2CostFlight) / 1.2)),
                easyProfitDay: 0
            };

            _result.realismProfitDay = Math.round(_result.realismProfitFlight * _tripsPerDay.realismTripsPerDay);
            _result.easyProfitDay = Math.round(_result.easyProfitFlight * _tripsPerDay.easyTripsPerDay);

            return _result;
        };

        this.ticket = (_flightRange) => {
            let roundMath = (_price) => {
                return (_price % 10 != 0 ? _price - (_price % 10) : _price);
            };

            let _result = {
                realismPriceY: roundMath((Math.floor((((0.3 * _flightRange) + 150) * 1.10)) / 10) * 10),
                realismPriceJ: roundMath((Math.floor((((0.6 * _flightRange) + 500) * 1.08)) / 10) * 10),
                realismPriceF: roundMath((Math.floor((((0.9 * _flightRange) + 1000) * 1.06)) / 10) * 10),
                easyPriceY: roundMath((Math.floor((((0.4 * _flightRange) + 170) * 1.10)) / 10) * 10),
                easyPriceJ: roundMath((Math.floor((((0.8 * _flightRange) + 560) * 1.08)) / 10) * 10),
                easyPriceF: roundMath((Math.floor((((1.2 * _flightRange) + 1200) * 1.06)) / 10) * 10)
            }

            return _result;
        };
        this.tripsPerDay = (_flightRange, _airSpeed) => {

            let _result = {
                realismTripsPerDay: Math.abs(24 / (_flightRange / _airSpeed)),
                easyTripsPerDay: Math.abs(24 / (_flightRange / (_airSpeed * 1.5)))
            };
            return _result;
        };
        this.paxFlight = (_seatsY, _seatsJ, _seatsF) => {
            return Math.round((+_seatsY + +_seatsJ + +_seatsF))
        }
        this.fuelCostFlight = (_fuelConsumption, _flightRange) => {
            return Math.round((_fuelConsumption * _flightRange * 0.85));
        };
        this.co2CostFlight = (_co2Consumption, _flightRange, _reputPercentage, _paxFlight) => {
            return Math.round(_co2Consumption * _paxFlight * _flightRange * 0.14 * (_reputPercentage / 100));
        };

        this.averageTime = (_distance, _speed) => {
            return (_distance / _speed);
        };
    }
    organizeElements() {
        this.centralize = (element) => {
            switch (element.style.position) {
                case 'absolute':
                    element.style.top = ((this.viewportH - element.offsetHeight) / 2) + 'px';
                    element.style.left = ((this.viewportW - element.offsetWidth) / 2) + 'px';
                    break;
                default:
                    element.style.marginTop = ((this.viewportH - element.offsetHeight) / 2) + 'px';
                    element.style.marginLeft = ((this.viewportW - element.offsetWidth) / 2) + 'px';
            }
            return element
        };
    }
    loadElements() {
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.toCamelCase(element.id)] = element;
        });
    }
    prototype() {
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach((event) => {
                this.addEventListener(event, fn, false);
            });
            return this;
        };
        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
        };
    }
    visual() {
        this._propertiesAnimatios = {};

        this.setPropertiesAnimations = () => {
            this._propertiesAnimatios[this.el.backover.id] = {
                me: this.el.backover,
                domOpen: [],
                closeType: ['mouseenter']
            };
        };
        window.toggleOver = (ref, mode) => {

            let obj = this.el.backover;

            ref = (ref === null || ref === undefined) ? this._propertiesAnimatios[obj.id].domOpen : ref;
            this._propertiesAnimatios[obj.id].domOpen = (this._propertiesAnimatios[obj.id].domOpen != ref) ? ref : [];
            this._propertiesAnimatios[obj.id].closeType = (mode === null || mode === undefined) ? [] : mode;

            obj.toggleClass('show');
            if (ref === null && ref === undefined) return;
            [...ref].forEach((element) => {
                element.toggleClass('show');
            });
        };
        this.setPropertiesAnimations();
    }
>>>>>>> a8cbeb7e761a482b8131d2dead10749d7dfc902a
}