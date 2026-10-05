const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="text-xs font-light uppercase text-muted-foreground/50">
      <a
        href="https://github.com/VladimirKobranov"
        target="_blank"
        rel="noreferrer"
        className="hover:text-muted-foreground hover:underline"
      >
        vk&nbsp;{year}
      </a>
    </footer>
  );
}

export default Footer;
