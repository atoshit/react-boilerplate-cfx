local function open()
  SetNuiFocus(true, true)
  SendReactMessage('module:open', { name = 'personnalmenu' })
end

RegisterCommand('personnalmenu', function()
  open()
end, false)

RegisterCommand('pmenu', function()
  open()
end, false)

