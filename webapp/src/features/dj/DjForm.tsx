import { Form, Spinner } from "react-bootstrap";
import { Dj } from "../../util/types";

type Props = {
    dj: Dj,
    setDj: React.Dispatch<React.SetStateAction<Dj>>,
    busy: boolean,
}

const DjForm = ({dj, setDj, busy}: Props) => {

    if(busy) {
        return <Spinner />
    }

    return <>
        <Form.Group className="mt-3">
            <Form.Label>Fur Name</Form.Label>
            <Form.Control
                required
                name="fur_name"
                value={dj.fur_name}
                type="input"
                onChange={(e) => setDj({...dj, "fur_name": e.target.value})} />
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label>Dj Name</Form.Label>
            <Form.Control
                required
                name="dj_name"
                value={dj.dj_name}
                type="input"
                onChange={(e) => setDj({...dj, "dj_name": e.target.value})} />
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label>Stream Url</Form.Label>
            <Form.Control 
                name="stream_url"
                value={dj.rtmp_url}
                type="input"
                aria-describedby="twitchUrlHelpBlock"
                onChange={(e) => setDj({...dj, "rtmp_url": e.target.value})} />
            <Form.Text id="twitchUrlHelpBlock" muted>
                Typically VRCDN or Twitch, but a few dj's have their own streaming methods we can notate here.
            </Form.Text>
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label>Twitch Username</Form.Label>
            <Form.Control
                name="twitch_username"
                value={dj.twitch_username}
                type="input"
                onChange={(e) => setDj({...dj, "twitch_username": e.target.value})}/>
        </Form.Group>
    </>
}

export default DjForm;
