-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Permission.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `resetToken` VARCHAR(191),
    `resetTokenExpiry` DECIMAL(65,30),
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` VARCHAR(191) NOT NULL,
    `mainUrl` VARCHAR(191) NOT NULL,
    `adminUrl` VARCHAR(191) NOT NULL,
    `galleryUrl` VARCHAR(191) NOT NULL,
    `cartUrl` VARCHAR(191) NOT NULL,
    `thumbUrl` VARCHAR(191) NOT NULL,
    `sorting` INT,
    `productId` VARCHAR(191),
INDEX `productId`(`productId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryImage` (
    `id` VARCHAR(191) NOT NULL,
    `thumbUrl` VARCHAR(191) NOT NULL,
    `adminUrl` VARCHAR(191) NOT NULL,
    `sorting` INT,
    `categoryId` VARCHAR(191),
INDEX `categoryId`(`categoryId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `sorting` INT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `slug_da` VARCHAR(191),
    `slug_en` VARCHAR(191),
    `name_da` VARCHAR(191),
    `name_en` VARCHAR(191),
    `description_da` VARCHAR(191),
    `description_en` VARCHAR(191),
UNIQUE INDEX `Category.slug_da_unique`(`slug_da`),
UNIQUE INDEX `Category.slug_en_unique`(`slug_en`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolvedAt` DATETIME(3),
    `imageUrl` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191),
    `customizable` BOOLEAN NOT NULL DEFAULT true,
    `hasMultiplePrices` BOOLEAN NOT NULL DEFAULT false,
    `sorting` INT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `selectedAttributes` VARCHAR(191),
    `slug_da` VARCHAR(191),
    `slug_en` VARCHAR(191),
    `name_da` VARCHAR(191),
    `name_en` VARCHAR(191),
    `description_da` VARCHAR(191),
    `description_en` VARCHAR(191),
    `priceId` VARCHAR(191),
UNIQUE INDEX `Product.code_unique`(`code`),
UNIQUE INDEX `Product.slug_da_unique`(`slug_da`),
UNIQUE INDEX `Product.slug_en_unique`(`slug_en`),
INDEX `priceId`(`priceId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sku` (
    `id` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `priceId` VARCHAR(191),
    `imageId` VARCHAR(191),
    `stock` INT NOT NULL DEFAULT 0,
UNIQUE INDEX `Sku.sku_unique`(`sku`),
INDEX `imageId`(`imageId`),
INDEX `priceId`(`priceId`),
INDEX `productId`(`productId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartSku` (
    `id` VARCHAR(191) NOT NULL,
    `skuId` VARCHAR(191) NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `customization` VARCHAR(191),
INDEX `cartId`(`cartId`),
INDEX `skuId`(`skuId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attribute` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `options` VARCHAR(191) NOT NULL,
    `position` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Price` (
    `id` VARCHAR(191) NOT NULL,
    `DKK` INT NOT NULL,
    `USD` INT NOT NULL,
    `EUR` INT NOT NULL,
    `GBP` INT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingProfile` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `priceId` VARCHAR(191) NOT NULL,
UNIQUE INDEX `ShippingProfile.code_unique`(`code`),
INDEX `priceId`(`priceId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchasedSku` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INT NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `variationInfo` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191),
    `customization` VARCHAR(191),
INDEX `orderId`(`orderId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `number` INT NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `shippedAt` DATETIME(3),
    `shipping` VARCHAR(191) NOT NULL,
    `shippingCosts` VARCHAR(191) NOT NULL,
    `total` INT NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `charge` VARCHAR(191) NOT NULL,
    `archived` BOOLEAN NOT NULL DEFAULT false,
    `trackingCode` VARCHAR(191),
    `customerId` VARCHAR(191) NOT NULL,
    `locale` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191),
UNIQUE INDEX `Order.id_unique`(`id`),
INDEX `customerId`(`customerId`),

    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191),
    `city` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_PermissionToUser_AB_unique`(`A`, `B`),
INDEX `_PermissionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_CategoryToProduct_AB_unique`(`A`, `B`),
INDEX `_CategoryToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryImage` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`priceId`) REFERENCES `Price`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sku` ADD FOREIGN KEY (`imageId`) REFERENCES `ProductImage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sku` ADD FOREIGN KEY (`priceId`) REFERENCES `Price`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sku` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartSku` ADD FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartSku` ADD FOREIGN KEY (`skuId`) REFERENCES `Sku`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingProfile` ADD FOREIGN KEY (`priceId`) REFERENCES `Price`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedSku` ADD FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToUser` ADD FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToProduct` ADD FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToProduct` ADD FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
