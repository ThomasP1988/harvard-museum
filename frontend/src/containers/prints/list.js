import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import store from './../../store';
import { fetchPrintListIfNeeded } from './../../store/actions';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
    thumbnail: {
        height: 100,

    },
    thumbnailContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class PrintList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prints: [],
            totalPrints: 0,
            pages: 0,
            currentPage: 1,
        }

        this.handleChangePage = this.handleChangePage.bind(this);
        this.storeListener = this.storeListener.bind(this);
    }

    async componentDidMount() {
        this.storeListener();
        this.unsubscribeStore = store.subscribe(this.storeListener);
        store.dispatch(fetchPrintListIfNeeded(this.state.currentPage));
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    storeListener() {
        const state = store.getState();
        console.log("State", state);
        const { currentPage } = this.state;
        if (!state.prints.isPageFetching[currentPage] && state.prints.byPage[currentPage]) {
            this.processData(state.prints, currentPage);
        }
    }

    processData(prints, page) {
        this.setState({
            prints: prints.byPage[page],
            totalPrints: prints.totalPrints,
            pages: prints.totalPages
        });
    }

    handleChangePage(e, newPage) {
        const nextPage = newPage + 1;
        const state = store.getState();
        this.setState({
            currentPage: nextPage
        });

        if (state.prints.byPage[nextPage]) {
            this.processData(state.prints, nextPage);
        } else {
            store.dispatch(fetchPrintListIfNeeded(nextPage));
        }
    }

    render() {

        const { classes } = this.props;
        const { totalPrints, prints, currentPage, loading } = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Toolbar
                    >
                        <Typography className={classes.title} variant="h6" id="tableTitle">
                            Harvard Prints
                    </Typography>
                    </Toolbar>

                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                    >
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                    >
                                        Century
                                </TableCell>
                                    <TableCell
                                        padding='default'
                                        align="left"
                                    >
                                        Title
                                </TableCell>

                                    <TableCell
                                        padding='default'
                                        align="left"
                                    >
                                        Accession method
                                </TableCell>
                                    <TableCell
                                        padding='default'
                                        align="left"
                                    >
                                        Culture
                                </TableCell>
                                    <TableCell
                                        padding='default'
                                        align="left"
                                    >
                                        Accession Year
                                </TableCell>
                                    <TableCell
                                        padding='default'
                                        align="left"
                                    >
                                        See on Harvard museum website
                                </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prints.map((print) => {
                                    return <TableRow
                                        hover
                                        key={print.id}
                                    >
                                        <TableCell align="left">
                                            <Card>
                                                <CardActionArea className={classes.thumbnailContainer}>
                                                    <img src={print.primaryimageurl} alt={print.title} className={classes.thumbnail} />
                                                </CardActionArea>
                                            </Card>
                                        </TableCell>
                                        <TableCell align="left">
                                            {print.century}
                                        </TableCell>
                                        <TableCell align="left">
                                            {print.title}
                                        </TableCell>
                                        <TableCell align="left">
                                            {print.accessionmethod}
                                        </TableCell>
                                        <TableCell align="left">
                                            {print.culture}
                                        </TableCell>
                                        <TableCell align="left">
                                            {print.accessionyear}
                                        </TableCell>
                                        <TableCell align="center">
                                            <a href={print.url} target="_blank" rel="noopener noreferrer">
                                                <IconButton aria-label="harvard museum website">
                                                    <ExitToAppIcon />
                                                </IconButton>
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                })}
                                {
                                    loading && <TableRow>
                                        <TableCell colSpan={6}>
                                            loading
                                    </TableCell>
                                    </TableRow>
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={totalPrints - 1}
                        rowsPerPage={10}
                        page={currentPage - 1}
                        onChangePage={this.handleChangePage}
                    />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(PrintList);