export default function setAlertMessage(msg, msgType='info') {
  const el = document.getElementById('alert-info')
  el.removeAttribute('hidden')
  el.innerText = msg
  el.className = 'alert alert-' + msgType
  console.log(el.className)
}