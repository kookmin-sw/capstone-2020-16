// import KnowledgeBasePage from "../ViewProblemPage";
// import * as Actions from 'app/store/actions';
// import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Test extends Component {

  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = document => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;
    const { tmp } = this.props;

    return (
      <React.Fragment>
        <div className="flex">
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button disabled={pageNumber <= 1} onClick={this.previousPage}>
              PREVIOUS
            </Button>
            <Button disabled={pageNumber >= numPages} onClick={this.nextPage}>
              NEXT
            </Button>
          </ButtonGroup>
          {/* <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p> */}
        </div>
        <Document
          file={`/assets/PDF/${tmp}.pdf`}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </React.Fragment>
    );
  }
}
