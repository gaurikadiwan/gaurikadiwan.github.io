---
title: Alzheimer's Disease Classification
tagline: A Vision Transformer built from scratch in PyTorch for classifying brain MRI slices from the ADNI dataset as Alzheimer's disease or normal control.
kind: Coursework · COMP3710 Pattern Analysis, UQ
period: Sep – Oct 2023
problem: Classifying brain scans as Alzheimer's disease or normal control. The course set this as a hard-difficulty task with a target of 80% test accuracy, to be met with a vision or transformer model.
contribution: Designed and wrote the Vision Transformer architecture, the ADNI dataset loader and preprocessing, and the plotting and prediction scripts, and wrote the project report.
stack: [Python, PyTorch, torchvision, Vision Transformer, Matplotlib]
repo: https://github.com/gaurikadiwan/PatternAnalysis-2023/tree/topic-recognition
evidence: public-repo
featured: true
order: 5
diagram:
  title: Vision Transformer, as implemented
  caption: The model architecture implemented in modules.py. Each 150×150 slice is cut into 16×16 patches, which are processed as a sequence.
  steps:
    - label: MRI slice
      note: Resized to 150×150
    - label: Patch embedding
      note: A strided convolution with batch norm turns 16×16 patches into tokens
    - label: Class token + positions
      note: Both learned
    - label: Transformer encoder
      note: Self-attention across all patches
      emphasis: true
    - label: MLP head
      note: GELU, LayerNorm, then class scores
---

## Overview

This was my project for COMP3710 Pattern Analysis at the University of Queensland. The task was to classify brain scans from the Alzheimer's Disease Neuroimaging Initiative (ADNI) as Alzheimer's disease (AD) or normal control (NC). The course rated it as hard difficulty and set a target of 80% accuracy on the test set.

## The data

The dataset is organised into `train` and `test` directories, each split into `AD` and `NC`. Each patient contributes 20 brain image slices.

| Split | AD | NC |
| --- | --- | --- |
| Training | 10,400 | 11,120 |
| Validation | 2,000 | 2,240 |
| Testing | 4,460 | 4,540 |

A custom PyTorch `Dataset` labels each image from its folder, applies the transforms and feeds a `DataLoader` that produces batches.

## The model

I wrote a Vision Transformer (ViT) from scratch rather than using a pretrained one:

- **Patch embedding.** A convolution with kernel size and stride equal to the patch size (16) turns each patch into an embedding vector, followed by batch normalisation.
- **Class token and positional embeddings.** Both are learned parameters. The class token is prepended to the patch sequence, and the positional embeddings preserve where each patch came from.
- **Transformer encoder.** Multi-head self-attention lets every patch attend to every other patch, which captures relationships across the whole slice.
- **MLP head.** A small network with GELU and LayerNorm maps the encoded sequence to class scores.

```python title="modules.py (excerpt)"
embedded = self.embedder(inputs)
token = self.token.repeat(embedded.size(0), 1, 1)
embedded = torch.cat([token, embedded], dim=1)
embedded += self.positions
encoded = self.transformer(embedded)
return self.mlp_head(torch.mean(encoded, dim=1))
```

## Engineering challenges

Training ran into memory problems with the Adam optimiser, so I switched to stochastic gradient descent with a learning rate of 0.01. The report also covers preprocessing choices such as resizing, augmentation and normalisation, and why each matters for medical images.

## Results and limitations

This project was a starting point, not a finished model. The architecture was written but never trained end to end on the brain scans:

- The final training script trains a small feed-forward network on synthetic data, not the Vision Transformer on the ADNI images.
- The prediction script uses an ImageNet-pretrained ResNet-18 that was never trained on the scans.
- The model code has issues that would stop it from running. The patch embeddings need transposing to a `(batch, patches, dim)` shape, and `nn.Transformer` expects both a source and a target, whereas a ViT only needs the encoder.

Because of that, the accuracy curves in the report don't measure this model, so I don't quote an accuracy figure for this project.

## What I'd do differently

I would fix the embedding shape, use `nn.TransformerEncoder`, and train the ViT on the ADNI loader. I would then evaluate it on the held-out test set and report accuracy with a confusion matrix. Because each patient contributes 20 slices, I would also split the data by patient so that slices from one person can't appear in both training and test data.

The biggest lesson was to verify an ML result end to end before reporting it, by checking that the model being evaluated is the one that was trained on the data being described. I now apply that habit to everything I build.
