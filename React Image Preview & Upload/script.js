"use strict";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: ""
    };
  }

  _handleSubmit(e) {
    e.preventDefault(); // TODO: do something with -> this.state.file

    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = /*#__PURE__*/ React.createElement("img", {
        src: imagePreviewUrl
      });
    } else {
      $imagePreview = /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "previewText"
        },
        "Please select an Image for Preview"
      );
    }

    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "previewComponent"
      },
      /*#__PURE__*/ React.createElement(
        "form",
        {
          onSubmit: (e) => this._handleSubmit(e)
        },
        /*#__PURE__*/ React.createElement("input", {
          className: "fileInput",
          type: "file",
          onChange: (e) => this._handleImageChange(e)
        }),
        /*#__PURE__*/ React.createElement(
          "button",
          {
            className: "submitButton",
            type: "submit",
            onClick: (e) => this._handleSubmit(e)
          },
          "Upload Image"
        )
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "imgPreview"
        },
        $imagePreview
      )
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(ImageUpload, null),
  document.getElementById("mainApp")
);
