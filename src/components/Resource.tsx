
type Props = {
  href: string;
  title: string;
  description;
}

export function Resource(props: Props) {
  const { title, href, description } = props;
  return (
    <a href={href} target="_blank" class="resource">
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
