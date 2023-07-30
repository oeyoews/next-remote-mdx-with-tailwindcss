import ViewCounter from './ViewCounter';

function Footer() {
  return (
    <footer className="text-sm mb-2 text-gray-500">
      <div className="container mx-auto text-center">
        <ViewCounter slug="total" />
        {/* <p className="text-gray-600">
          © 2023 Your Company. All rights reserved.
        </p> */}
      </div>
    </footer>
  );
}

export default Footer;
