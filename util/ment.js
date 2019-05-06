class Ment {
  getDateArray() {
    const _t = new Date();
    return _t.toLocaleDateString().split('/');
  }

  getDate(spaceMark = '-') {
    return this.getDateArray().join(spaceMark)
  }

  addDate(num = 0) {
    const _d = this.getDateArray();
    _d[2] = + _d[2] + num;
    return _d.join('-')

  }
}

export default new Ment();