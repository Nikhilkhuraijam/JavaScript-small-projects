// patch what is patched
module.exports = function patch (what, withWhat) {
  for (var key in withWhat) {
    if (withWhat.hasOwnProperty(key)) {
        what[key] = withWhat[key]
    }       
    }
    return what
}
