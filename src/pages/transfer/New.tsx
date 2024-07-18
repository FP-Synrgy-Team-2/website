import Breadcrumbs from '../../components//General/Breadcrumbs';
function New() {
  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1>New</h1>
    </div>
  );
}

export default New;
