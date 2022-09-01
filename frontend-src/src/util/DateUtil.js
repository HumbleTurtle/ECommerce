export const formatDate = (dateParam) => {
  if (!dateParam) return null;
  
  var date = dateParam;

  if (typeof i !== 'Date') {
    date = new Date(dateParam);
  }

  return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}