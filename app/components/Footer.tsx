import TextLink from "./TextLink";

export default function Footer() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="text-bg2"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,256L288,288L576,224L864,320L1152,224L1440,128L1440,320L1152,320L864,320L576,320L288,320L0,320Z"
        ></path>
      </svg>
      <footer className="bg-bg2 p-12">
        <div className="container mx-auto text-center">
          <small className="text-fg3">
            &copy; {new Date().getFullYear()} APR on Campus |{" "}
          </small>

          <small>
            <TextLink href="/privacy-policy">Privacy Policy</TextLink>
          </small>
        </div>
      </footer>
    </div>
  );
}
