export default class UtilsService {
  static formatReal(val) {
    console.log(typeof val, val)
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", }).format(val);  
  }

  static parseReal(val) {
    if (typeof val !== "string") {
      val = val.toString(); // Garante que o valor seja uma string
    }
    const cleaned = val.replace(/[^\d,-]/g, "").replace(",", ".");
    return parseFloat(cleaned) || 0; // Retorna 0 se o valor não for um número válido
  }
  

  static formatDateBr(data) {
    data = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(data);
  }

  static formatData(val) {
    if (!val) return "";
    const [year, month, day] = val.split("-");
    return new Date(year, month - 1, day).toLocaleDateString();
  }
}
