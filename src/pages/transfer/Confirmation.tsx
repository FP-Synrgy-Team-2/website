import Breadcrumbs from '../../components/General/Breadcrumbs';
function Confirmation() {
  const breadcrumbs = [
    { label: 'Transfer', path: 'transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
    { label: 'Konfirmasi Transaksi', path: '/transfer/confirm' },
  ];
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1>Confirmation</h1>
    </div>
  );
}

export default Confirmation;
