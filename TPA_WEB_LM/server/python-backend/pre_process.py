import tensorflow as tf
import pathlib

data_dir = pathlib.Path("./AIDataset/train")
batch_size = 32
img_height = 227
img_width = 227

train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.01,
    subset="training",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size)

data_dir = pathlib.Path("./AIDataset/valid")

val_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.99,
    subset="validation",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size)

data_dir = pathlib.Path("./AIDataset/test")

test_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.99,
    subset="validation",
    seed=123,
    image_size=(img_height, img_width),
    batch_size=batch_size
)
