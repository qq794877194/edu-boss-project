export const formatDate = (date: string | number): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1 + '').padStart(2, '0');
  const day = (d.getDate() + '').padStart(2, '0');
  const hour = (d.getHours() + '').padStart(2, '0');
  const minute = (d.getMinutes() + '').padStart(2, '0');
  const second = (d.getSeconds() + '').padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const delConfirm = function (this: any, title: string, delCallback: any) {
  const h = (this).$createElement;
  let delError = false;
  return this.$msgbox({
    title: '删除提示',
    message: h('p', null, [
      '确认要删除',
      h('span', { class: 'color-warning' }, `【${title}】`),
      '吗?'
    ]),
    type: 'warning',
    showCancelButton: true,
    async beforeClose (action: string, instance: any, done: any) {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = '删除中...';
        try {
          await delCallback();
          instance.confirmButtonLoading = false;
          done();
        } catch (e) {
          delError = true;
        }
        done();
      } else {
        done();
      }
    }
  }).then((res: any) => {
    if (!delError) {
      this.$message.success('删除成功');
    }
  }).catch((e: any) => {
    if (e === 'cancel' || e === 'close') {
      return;
    }
    if (delError) {
      // this.$message.error('删除失败');
      throw new Error('删除失败');
    }
  });
};
