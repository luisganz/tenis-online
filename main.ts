input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    X = Math.constrain(X, 0, 4) - 1
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (Y == 1) {
        Y = 0
    } else if (Y == 0) {
        Y = 1
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    X = Math.constrain(X, 0, 4) + 1
})
radio.onReceivedValue(function (name, value) {
    if (name == "Y") {
        if (value == 1) {
            On_Y = 3
        } else if (value == 0) {
            On_Y = 4
        }
    }
    if (name == "X") {
        On_X = value
    }
})
let On_X = 0
let On_Y = 0
let Y = 0
let X = 0
radio.setTransmitSerialNumber(false)
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    led.plot(Math.constrain(X, 0, 4), Y)
    if (Y == 1) {
        led.unplot(X, 0)
    } else if (Y == 0) {
        led.unplot(X, 1)
    }
    led.unplot(X + 1, Y)
    led.unplot(X - 1, Y)
    radio.sendValue("X", X)
    radio.sendValue("Y", Y)
})
basic.forever(function () {
    led.plot(Math.constrain(On_X, 0, 4), On_Y)
    if (On_Y == 3) {
        led.unplot(On_X, 4)
    } else if (On_Y == 4) {
        led.unplot(On_X, 3)
    }
    led.unplot(On_X + 1, On_Y)
    led.unplot(On_X - 1, On_Y)
})
