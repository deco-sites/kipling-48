export interface Props {
  title: string;
  text: string;
}
function SocialEngagement({ title, text }: Props) {
  return (
    <div className="bg-gray-50 flex flex-col items-center py-5">
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <div>
        <p
          className="text-xs font-thin text-center"
          dangerouslySetInnerHTML={{ __html: text }}
        >
        </p>
      </div>
    </div>
  );
}

export default SocialEngagement;
