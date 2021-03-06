import {
  Button,
  Hidden,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { cartStyles } from './styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { increaseCart, decreaseCart, removeCartProduct } from '../../redux';

const CartItems = ({
  variants,
  increaseCart,
  decreaseCart,
  removeCartProduct,
}) => {
  const classes = cartStyles();

  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <Hidden only='xs'>
              <TableCell align='right'>Quantity</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'></TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants?.map((item) => (
            <TableRow key={item.id}>
              <TableCell component='th' scope='row'>
                <div className={classes.productItem}>
                  <div>
                    <img
                      src={item.variant.image.src}
                      alt={item.variant.image.altText}
                    />
                  </div>
                  <div>
                    <Typography variant='subtitle1' component='h4'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Style: {item.variant.title}
                    </Typography>
                  </div>
                </div>
                <Hidden smUp>
                  <div className={classes.qtyMobile}>
                    <Typography variant='subtitle2'>Quantity:</Typography>
                    <div className={classes.productQty}>
                      <IconButton
                        aria-label='reduce quantity'
                        size='small'
                        onClick={() => decreaseCart(item.id, item.quantity)}
                      >
                        <RemoveIcon fontSize='inherit' />
                      </IconButton>
                      <span>{item.quantity}</span>
                      <IconButton
                        aria-label='reduce quantity'
                        size='small'
                        onClick={() => increaseCart(item.id, item.quantity)}
                      >
                        <AddIcon fontSize='inherit' />
                      </IconButton>
                    </div>
                  </div>
                  <div>
                    <Typography variant='subtitle2' gutterBottom>
                      Price: PHP {item.variant.price}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={() => removeCartProduct(item.id, item.quantity)}
                    >
                      Remove
                    </Button>
                  </div>
                </Hidden>
              </TableCell>
              <Hidden xsDown>
                <TableCell align='center'>
                  <div className={classes.productQty}>
                    <IconButton
                      aria-label='reduce quantity'
                      size='small'
                      onClick={() => decreaseCart(item.id, item.quantity)}
                    >
                      <RemoveIcon fontSize='inherit' />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton
                      aria-label='reduce quantity'
                      size='small'
                      onClick={() => increaseCart(item.id, item.quantity)}
                    >
                      <AddIcon fontSize='inherit' />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align='center'>PHP {item.variant.price}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => removeCartProduct(item.id, item.quantity)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    variants: state.addCart.cart.lineItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCart: (variantId, qty) => dispatch(increaseCart(variantId, qty)),
    decreaseCart: (variantId, qty) => dispatch(decreaseCart(variantId, qty)),
    removeCartProduct: (variantId, qty) =>
      dispatch(removeCartProduct(variantId, qty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
