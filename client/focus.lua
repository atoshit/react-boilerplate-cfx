local focused = false

local function setFocus(state, cursor)
  focused = state
  SetNuiFocus(state, cursor == nil and state or cursor)
end

local function isFocused()
  return focused
end

exports('SetReactFocus', setFocus)
exports('IsReactFocused', isFocused)

RegisterNUICallback('react:setFocus', function(data, cb)
  setFocus(data.state == true, data.cursor)
  cb({ ok = true })
end)

RegisterNUICallback('react:close', function(_, cb)
  setFocus(false, false)
  cb({ ok = true })
end)