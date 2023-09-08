import React, { useState, useContext, useRef, useEffect } from "react";
import { useQuill } from "react-quilljs";
import { AppContext } from "../Context/Context";
import PhonePreview from "../PhonePreview/PhonePreview";
import "./NewsEditor.css";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import { Button, Form, Table, Modal, Spinner } from "react-bootstrap";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import db from "../Firebase/firebaseConfig";

const NewsEditor = () => {
  const { quill, quillRef } = useQuill();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const previewRef = useRef(null);
  const [tableOn, setTableOn] = useState(false);
  const [formAddNewOn, setFormAddNewOn] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  //Estado para la imagen base64
  const [backgroundImage, setBackgroundImage] = useState(null);
  //Estado para el modal
  const [modalVisible, setModalVisible] = useState(false);

  // Llamada desde el context
  const { savedNews } = useContext(AppContext);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const editorContent = quill.root.innerHTML;
        setValue(editorContent);

        setContent(editorContent);
        const editorText = quill.getText().trim(); // Obtener el texto sin formato del editor
        setNotedata({ ...noteData, content: editorText });
      });
    }
  }, [quill]);

  //Tiempo real en el previsualizador
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = value;
    }
  }, [value]);

  //Funcion para crear campos del Firestore
  const [noteData, setNotedata] = useState({
    content: content,
    date: new Date().toISOString(),
    newsImage: backgroundImage,
    state: "",
    subtitle: "",
    title: "",
  });

  const getImageInBase64 = (imagen) => {
    const reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onload = function () {
      var base64 = reader.result;
      setBackgroundImage(base64);
      setNotedata({
        ...noteData,
        newsImage: base64,
      });
    };
  };

  //Funcion del firebase
  const handleSubmitFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "ReactNewsHub"), {
        ...noteData,
      });

      await updateDoc(doc(db, "ReactNewsHub", docRef.id), {
        id: docRef.id,
      });

      console.log("Document written with ID: ", docRef.id);

      setLoading2(false);
      alert("Noticia agregada correctamente");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="padre">
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h4 style={{ color: "white", fontWeight: "600" }}>
          Gestor de noticias para usuarios
        </h4>
      </div>

      <div>
        <h5 style={{ textAlign: "center", color: "white" }}>
          Noticias activas ahora
        </h5>
        {savedNews &&
          savedNews.map((news, i) => {
            return (
              news.state == "Activa" && (
                <div
                  key={i}
                  style={{
                    marginBottom: 10,
                    textAlign: "center",
                    border: "2px solid white",
                    padding: 15,
                    borderRadius: 12,
                    width: "70%",
                    marginInline: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <h6 style={{ color: "whitesmoke", marginTop: 10 }}>
                      {news.title}
                    </h6>
                  </div>
                  <div>
                    <Button
                      variant="outline-light"
                      onClick={() => navigate(`/newsPortal/<${news.id}>`)}
                    >
                      Ver noticia completa
                    </Button>
                  </div>
                  <div>
                    <Button variant="danger">Quitar noticia de la App</Button>
                  </div>
                </div>
              )
            );
          })}
      </div>

      <div style={{ textAlign: "center", margin: 25 }}>
        <Button
          variant="light"
          style={{ marginInline: 10, margin: 10 }}
          onClick={() => {
            setFormAddNewOn(!formAddNewOn);
            setTableOn(false);
          }}
        >
          {formAddNewOn ? "Cerrar formulario" : "Agregar nueva noticia"}{" "}
        </Button>
        <Button
          variant="light"
          style={{ marginInline: 10 }}
          onClick={() => {
            setTableOn(!tableOn);
            setFormAddNewOn(false);
          }}
        >
          {tableOn ? "Cerrar noticias" : "Ver todas las noticias"}
        </Button>
      </div>

      {tableOn && (
        <>
          <div
            style={{ textAlign: "center", width: "40%", marginInline: "auto" }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar por título de noticia"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </div>

          <div style={{ margin: 35 }}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ color: "white", textAlign: "center" }}>
                  <th>Título</th>
                  <th>Bajada</th>
                  <th>Fecha de subida</th>
                  <th>Estado actual</th>
                  <th>Modificar estado</th>
                </tr>
              </thead>
              {savedNews &&
                savedNews
                  .filter((news) =>
                    news.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((news) => {
                    return (
                      <tbody>
                        <tr style={{ textAlign: "center" }}>
                          <td style={{ color: "white", fontSize: 16 }}>
                            {news.title}
                          </td>
                          <td style={{ color: "white", fontSize: 16 }}>
                            {news.subtitle}
                          </td>
                          <td style={{ color: "white", fontSize: 16 }}>
                            {new Date(news.date).toLocaleDateString()}
                          </td>
                          <td style={{ color: "white", fontSize: 16 }}>
                            {news.state}
                          </td>
                          <td style={{ color: "white", fontSize: 16 }}>
                            {news.state == "Activa" ? (
                              <>
                                {!loading && (
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      setLoading(true);
                                      updateNewsStateUnactive(news.id).then(
                                        () =>
                                          setTimeout(() => {
                                            setLoading(false);
                                          }, [1000])
                                      );
                                    }}
                                  >
                                    Desactivar
                                  </Button>
                                )}
                              </>
                            ) : (
                              !loading && (
                                <Button
                                  variant="success"
                                  onClick={() => {
                                    setLoading(true);
                                    updateNewsState(news.id).then(() =>
                                      setTimeout(() => {
                                        setLoading(false);
                                      }, [1000])
                                    );
                                  }}
                                >
                                  Activar
                                </Button>
                              )
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
            </Table>
          </div>
        </>
      )}

      {formAddNewOn && (
        <div className="formContiner">
          <div className="container">
            <div className="containerEditor">
              <h5 style={{ color: "white" }}>Agregar nueva noticia</h5>
              <Form
                onSubmit={(e) => {
                  setLoading2(true);
                  e.preventDefault();
                  handleSubmitFirebase();
                }}
              >
                <Form.Group className="m-4">
                  <Form.Control
                    placeholder="Ingrese título de la noticia"
                    required
                    onChange={(e) =>
                      setNotedata({ ...noteData, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="m-4">
                  <Form.Control
                    placeholder="Ingrese bajada de la noticia (hasta 50 caracteres)"
                    required
                    onChange={(e) =>
                      setNotedata({ ...noteData, subtitle: e.target.value })
                    }
                  />
                </Form.Group>

                <div ref={quillRef} className="quill" />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8,
                      padding: 2,
                      marginRight: 8,
                    }}
                  >
                    <h6
                      style={{ marginInline: 7, color: "grey", paddingTop: 8 }}
                    >
                      Añadir imagen de portada ➡
                    </h6>
                  </div>

                  <div>
                    <Form.Group>
                      <Form.Control
                        type="file"
                        onChange={(e) => getImageInBase64(e.target.files[0])}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="m-4">
                  <Form.Select
                    onChange={(e) =>
                      setNotedata({ ...noteData, state: e.target.value })
                    }
                  >
                    <option>Estado</option>
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                  </Form.Select>
                </Form.Group>
                <div className="botones">
                  {loading2 && (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}

                  {!loading2 && (
                    <div className="container-button">
                      <Button variant="outline-light" onClick={openModal}>
                        Previsualizar
                      </Button>
                      <Button variant="outline-light" type="submit">
                        Agregar
                      </Button>
                    </div>
                  )}
                </div>
              </Form>
            </div>

            {modalVisible && (
              <Modal show={modalVisible} className="modal-container">
                <Modal.Body className="custom-modal-body">
                  <PhonePreview
                    content={value}
                    backgroundImage={backgroundImage}
                  />
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <Button variant="secondary" onClick={closeModal}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsEditor;
