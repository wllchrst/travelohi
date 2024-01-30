from pre_process import train_ds, val_ds, test_ds
from tensorflow.keras import models
from tensorflow.keras import layers
import tensorflow as tf
LABELS = train_ds.class_names

for x, y in train_ds.take(1):
    break

INPUT_SHAPE = x.shape[1:]
MODEL = models.Sequential(
    [
        layers.Input(shape=INPUT_SHAPE),
        layers.Normalization(),
        layers.Conv2D(96, kernel_size=(11,11), strides= 4, padding= 'valid', activation= 'relu', input_shape= INPUT_SHAPE, kernel_initializer= 'he_normal'),
        layers.MaxPooling2D(pool_size=(3,3), strides= (2,2), padding= 'valid', data_format= None),
        layers.Conv2D(256, kernel_size=(5,5), strides= 1, padding= 'same', activation= 'relu', kernel_initializer= 'he_normal'),
        layers.MaxPooling2D(pool_size=(3,3), strides= (2,2), padding= 'valid', data_format= None),
        layers.Conv2D(384, kernel_size=(3,3), strides= 1, padding= 'same', activation= 'relu', kernel_initializer= 'he_normal'),
        layers.Conv2D(384, kernel_size=(3,3), strides= 1, padding= 'same', activation= 'relu', kernel_initializer= 'he_normal'),
        layers.Conv2D(256, kernel_size=(3,3), strides= 1, padding= 'same', activation= 'relu', kernel_initializer= 'he_normal'),
        layers.MaxPooling2D(pool_size=(3,3), strides= (2,2), padding= 'valid', data_format= None),
        layers.Flatten(),
        layers.Dense(4096, activation='relu'),
        layers.Dense(4096, activation='relu'),
        layers.Dense(1000, activation='relu'),
        layers.Dense(7, activation='softmax'),
    ]
)

MODEL.compile(optimizer=tf.keras.optimizers.Adam(0.001),
            loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
            metrics=['accuracy'])

EPOCH = 3

MODEL_FIT = MODEL.fit(
    train_ds,
    validation_data = val_ds,
    epochs = EPOCH,
    callbacks = tf.keras.callbacks.EarlyStopping(verbose = 1, patience = 2)
)
