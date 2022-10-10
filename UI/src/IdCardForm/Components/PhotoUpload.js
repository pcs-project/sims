import React, { Component } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import i18n from "../../il8n/il8n";
export class PhotoUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSize: 0,
    };

    this.onUpload = this.onUpload.bind(this);
    this.onTemplateUpload = this.onTemplateUpload.bind(this);
    this.onTemplateSelect = this.onTemplateSelect.bind(this);
    this.onTemplateRemove = this.onTemplateRemove.bind(this);
    this.onTemplateClear = this.onTemplateClear.bind(this);
    this.onBasicUpload = this.onBasicUpload.bind(this);
    this.onBasicUploadAuto = this.onBasicUploadAuto.bind(this);
    this.headerTemplate = this.headerTemplate.bind(this);
    this.itemTemplate = this.itemTemplate.bind(this);
    this.emptyTemplate = this.emptyTemplate.bind(this);
    this.fileUploader = this.fileUploader.bind(this);
  }

  fileUploader(e) {
    var mimes = [
      {
        mime: "image/jpeg",
        pattern: [0xff, 0xd8, 0xff],
        mask: [0xff, 0xff, 0xff],
      },
      {
        mime: "image/png",
        pattern: [0x89, 0x50, 0x4e, 0x47],
        mask: [0xff, 0xff, 0xff, 0xff],
      },
      // you can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
    ];
    var reader = new FileReader();
    //this.props.uploadHandler(e.files[0]);
    function check(bytes, mime) {
      for (var i = 0, l = mime.mask.length; i < l; ++i) {
        if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
          return false;
        }
      }
      return true;
    }
    reader.onloadend = (s) => {
      if (s.target.readyState === FileReader.DONE) {
        var bytes = new Uint8Array(s.target.result);

        for (var i = 0, l = mimes.length; i < l; ++i) {
          if (check(bytes, mimes[i])) {
            return this.props.uploadHandler(e.files[0]);
          }
        }
        //clear template

        this.fileUploadRef.clear();
        return this.toast.show({
          severity: "error",
          summary: "Error",
          detail: "Upload Valid Image",
        });
      }
    };

    reader.readAsArrayBuffer(e.files[0].slice(0, 4));
  }
  onUpload() {
    this.toast.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
  }

  onTemplateSelect(e) {
    let totalSize = this.state.totalSize;
    e.files.forEach((file) => {
      totalSize += file.size;
    });

    this.setState({
      totalSize,
    });
  }

  onTemplateUpload(e) {
    let totalSize = 0;
    e.files.forEach((file) => {
      totalSize += file.size || 0;
    });

    this.setState(
      {
        totalSize,
      },
      () => {
        this.toast.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
      }
    );
  }

  onTemplateRemove(file, callback) {
    this.setState(
      (prevState) => ({
        totalSize: prevState.totalSize - file.size,
      }),
      callback
    );
  }

  onTemplateClear() {
    this.setState({ totalSize: 0 });
  }

  onBasicUpload() {
    this.toast.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    });
  }

  onBasicUploadAuto() {
    this.toast.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Auto Mode",
    });
  }

  headerTemplate(options) {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = this.state.totalSize / 10000;
    const formatedValue = this.fileUploadRef
      ? this.fileUploadRef.formatSize(this.state.totalSize)
      : "0 B";

    return (
      <div
        className={className}
        style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
  }

  itemTemplate(file, props) {
    //console.log("---- file", file, props);
    console.log("---- file", file);
    console.log("---- props", props);
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => this.onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  }

  emptyTemplate() {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
          Drag and Drop Image Here
          {this.state.dragText}
        </span>
      </div>
    );
  }

  render() {
    const chooseOptions = {
      label: i18n.language == LANGUAGE.ENGLISH ? "Choose" : "छान्नुहोस",
      icon: "pi pi-fw pi-plus",
    };
    const uploadOptions = {
      icon: "pi pi-fw pi-cloud-upload",
      iconOnly: true,
      className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
      icon: "pi pi-fw pi-times",
      iconOnly: true,
      className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };

    return (
      <div>
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>

        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

        <div className="card">
          <FileUpload
            ref={(el) => {
              this.fileUploadRef = el;
            }}
            chooseOptions={chooseOptions}
            cancelOptions={cancelOptions}
            name="demo[]"
            url=""
            onUpload={this.onUpload}
            multiple={false}
            accept="image/*"
            maxFileSize={1000000}
            customUpload
            uploadHandler={this.fileUploader}
            auto
            emptyTemplate={
              <p className="m-0">
                {i18n.language == LANGUAGE.ENGLISH
                  ? " Drag and Drop Image Here"
                  : "फाइललाइ तानेर यो वक्समा राख्नुहोस् "}
              </p>
            }
          />
        </div>
      </div>
    );
  }
}
export default PhotoUpload;
function loadMime(file, callback) {
  //List of known mimes
  var mimes = [
    {
      mime: "image/jpeg",
      pattern: [0xff, 0xd8, 0xff],
      mask: [0xff, 0xff, 0xff],
    },
    // {
    //   mime: "image/png",
    //   pattern: [0x89, 0x50, 0x4e, 0x47],
    //   mask: [0xff, 0xff, 0xff, 0xff],
    // },
    // you can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
  ];

  function check(bytes, mime) {
    for (var i = 0, l = mime.mask.length; i < l; ++i) {
      if ((bytes[i] & mime.mask[i]) - mime.pattern[i] !== 0) {
        return false;
      }
    }
    return true;
  }

  var blob = file.slice(0, 4); //read the first 4 bytes of the file

  var reader = new FileReader();
  reader.onloadend = function (e) {
    if (e.target.readyState === FileReader.DONE) {
      var bytes = new Uint8Array(e.target.result);

      for (var i = 0, l = mimes.length; i < l; ++i) {
        if (check(bytes, mimes[i])) {
          return callback(true);
        }
      }

      return callback(false);
    }
  };
  reader.readAsArrayBuffer(blob);
}
function imageExists(url, callback) {
  var img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}
