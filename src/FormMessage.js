import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';


const FormMessage = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [nameInvalid, setNameInvalid] = useState('');
    const [msgInvalid, setMsgInvalid] = useState('');
    const [required, setRequired] = useState(false);
    
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(true);
    const [comments, setComments] = useState([]); 

    const handleSendMessage = () => {
        const newMessage = {
            username: name,
            message: message,
        };

        if(name === '') {
            setNameInvalid('Nama Tidak boleh kosong');
            setRequired(true);
            return false;
        } 

        if(message === '') {
            setMsgInvalid('Ucapan Tidak boleh kosong');
            setRequired(true);
            return false;
        } 

        axios.post('https://wedding-db-json-production.up.railway.app/comments', newMessage)
            .then(response => {
                console.log('Message sent successfully:', response.data);
                // Show success toast
                setShowSuccessToast(true);
                setTimeout(() => {
                    setShowSuccessToast(false);
                }, 3000);
                setShowErrorToast(false);
                setRequired(false);
                fetchComments();
                setName('');
                setMessage('');
                setAlertMessage('Ucapanmu sudah dikirim.');
                // Additional handling if needed, e.g., update state
            })
            .catch(error => {
                setAlertMessage('Error sending message. Please try again.');
                console.error('Error sending message:', error);
                // Show error toast
                setShowSuccessToast(false);
                setShowErrorToast(true);
                setTimeout(() => {
                    setShowErrorToast(false);
                }, 3000);
                setRequired(false);
                // Additional error handling if needed, e.g., update state
            });
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get('https://wedding-db-json-production.up.railway.app/comments');
            setComments(response.data);
        } catch (error) {
            setAlertMessage('Error fetching comments:');
            console.error('Error fetching comments:', error);
            setShowErrorToast(true);
        }
    };

    const pastelColors = [
        '#FFB3BA', // light pink
        '#FFDFBA', // light peach
        '#FFFFBA', // light yellow
        '#BAFFC9', // light green
        '#BAE1FF', // light blue
        '#E0BAFF', // light purple
      ];
      
      // Function to select a random color from the pastel colors array
    function getRandomPastelColor() {
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    }
      

    useEffect(() => {
        fetchComments();
    }, []);
    
    return(
        <React.Fragment>
            <div className="py-5 float-left" style={{
                backgroundColor: "#d8cfc6",
                backgroundImage: "url(./assets/images/att_rose_max.png)",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                boxShadow: "inset 2000px 0 0 0 rgb(217 207 201 / 50%)"
            }}>
                <div className="font-rosemary_jasmine-title mt-4 py-4"
                >Ucapan & Doa</div>
                <div className="message-scroll pb-5">
                    <Row className="gy-3">
                        {comments.map((comment) => (
                            <Col xs={12} key={comment.id}>
                                <div className="d-flex">
                                    <div className="avatar-item col-3 text-capitalize" style={{
                                        backgroundColor: getRandomPastelColor(),
                                    }}>{comment.username ? comment.username.trim().charAt(0) : ''}</div>
                                    <Card className="message-head text-left col px-2 pb-2">
                                        <div className="message-arrow"></div>
                                        <Card.Title className="message-username m-0 mt-2 ps-1">{comment.username}</Card.Title>
                                        <Card.Body className="p-1">
                                            <Card.Text className="message-body p-0">
                                                {comment.message}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="form-container mt-2 px-4">
                    <label>Kirim Ucapan</label>
                    {
                        showSuccessToast && (<div className="bg-default text-success rounded mt-2">
                            <strong>{alertMessage}</strong>
                        </div>)
                    }

                    {
                        showErrorToast && (<div className="bg-default text-danger rounded mt-2">
                            <strong>{alertMessage}</strong>
                        </div>)
                    }

                    <Row className="gy-3 mt-3">
                        <Col xs={12}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="nama anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            { required && (<label className="text-danger w-100 text-start">
                                <small>{nameInvalid}</small>
                            </label>) }
                        </Col>
                        <Col xs={12}>
                            <textarea
                                className="form-control"
                                placeholder="Tulis pesan ucapan Anda..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            { required && (<label className="text-danger w-100 text-start">
                                <small>{msgInvalid}</small>
                            </label>) }
                        </Col>
                        <Col xs={12}>
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={handleSendMessage}
                            >
                                Kirim
                            </Button>
                        </Col>
                    </Row>

                </div>
            </div>

        </React.Fragment>
    )
}

export default FormMessage;