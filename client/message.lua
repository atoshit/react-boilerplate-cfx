SendReactMessage = function(action, payload)
  SendNUIMessage({ action = action, payload = payload })
end

exports('SendReactMessage', SendReactMessage)