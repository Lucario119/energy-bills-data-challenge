import BillsLibraryContent from "./components/BillsLibraryContent";

export async function generateMetadata() {
  
  return {
	  title: 'Biblioteca das Faturas',
  };
}

export default async function BillsLibrary() {

  return (
    <BillsLibraryContent/>
  );
}
